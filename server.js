require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===== DATA PERSISTENCE =====
const DATA_DIR = path.join(__dirname, 'data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');
const USED_QUESTIONS_FILE = path.join(DATA_DIR, 'used_questions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(file, defaultValue = []) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${file}:`, e.message);
  }
  return defaultValue;
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ===== HISTORY API =====
app.get('/api/history', (req, res) => {
  const history = readJSON(HISTORY_FILE, []);
  res.json(history);
});

app.post('/api/history', (req, res) => {
  const history = readJSON(HISTORY_FILE, []);
  const entry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    question: req.body.question,
    questionType: req.body.questionType,
    participants: req.body.participants,
    responses: req.body.responses,
    scores: req.body.scores,
    feedback: req.body.feedback
  };
  history.unshift(entry); // newest first
  // Keep last 100 sessions
  if (history.length > 100) history.length = 100;
  writeJSON(HISTORY_FILE, history);
  res.json(entry);
});

app.delete('/api/history', (req, res) => {
  writeJSON(HISTORY_FILE, []);
  res.json({ success: true });
});

// ===== LEADERBOARD API =====
app.get('/api/leaderboard', (req, res) => {
  const leaderboard = readJSON(LEADERBOARD_FILE, {});
  res.json(leaderboard);
});

app.post('/api/leaderboard', (req, res) => {
  const leaderboard = readJSON(LEADERBOARD_FILE, {});
  const { name, scores } = req.body;

  if (!leaderboard[name]) {
    leaderboard[name] = {
      totalSessions: 0,
      totalCreativity: 0,
      totalTeamwork: 0,
      totalVariety: 0,
      totalOverall: 0,
      bestScore: 0,
      streak: 0,
      lastPlayed: null,
      badges: []
    };
  }

  const player = leaderboard[name];
  player.totalSessions += 1;
  player.totalCreativity += (scores.creativity || 0);
  player.totalTeamwork += (scores.teamwork || 0);
  player.totalVariety += (scores.variety || 0);
  player.totalOverall += (scores.overall || 0);
  if (scores.overall > player.bestScore) {
    player.bestScore = scores.overall;
  }

  // Streak tracking
  const today = new Date().toDateString();
  const lastPlayed = player.lastPlayed ? new Date(player.lastPlayed).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastPlayed === yesterday || lastPlayed === today) {
    if (lastPlayed !== today) player.streak += 1;
  } else if (lastPlayed !== today) {
    player.streak = 1;
  }
  player.lastPlayed = new Date().toISOString();

  // Award badges
  if (player.totalSessions >= 5 && !player.badges.includes('dedicated')) {
    player.badges.push('dedicated');
  }
  if (player.totalSessions >= 20 && !player.badges.includes('veteran')) {
    player.badges.push('veteran');
  }
  if (player.bestScore >= 9 && !player.badges.includes('superstar')) {
    player.badges.push('superstar');
  }
  if (player.streak >= 7 && !player.badges.includes('on_fire')) {
    player.badges.push('on_fire');
  }
  if ((player.totalCreativity / player.totalSessions) >= 8 && player.totalSessions >= 3 && !player.badges.includes('creative_genius')) {
    player.badges.push('creative_genius');
  }

  leaderboard[name] = player;
  writeJSON(LEADERBOARD_FILE, leaderboard);
  res.json(leaderboard);
});

// ===== USED QUESTIONS TRACKING =====
app.get('/api/used-questions', (req, res) => {
  const used = readJSON(USED_QUESTIONS_FILE, []);
  res.json(used);
});

app.post('/api/used-questions', (req, res) => {
  const used = readJSON(USED_QUESTIONS_FILE, []);
  const { questionId } = req.body;
  if (!used.includes(questionId)) {
    used.push(questionId);
  }
  writeJSON(USED_QUESTIONS_FILE, used);
  res.json(used);
});

app.delete('/api/used-questions', (req, res) => {
  writeJSON(USED_QUESTIONS_FILE, []);
  res.json({ success: true });
});

// ===== AI FEEDBACK ENDPOINT =====
app.post('/api/feedback', async (req, res) => {
  try {
    const { question, responses, questionType } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert Odyssey of the Mind Spontaneous competition coach. 
A team of girls just practiced a ${questionType} spontaneous problem.

The question was: "${question}"

Here are the team members' responses (in order they answered):
${responses.map((r, i) => `${i + 1}. ${r.name}: "${r.answer}"`).join('\n')}

Please provide feedback in the following JSON format (and ONLY valid JSON, no markdown):
{
  "overallScore": <number 1-10>,
  "creativity": <number 1-10>,
  "teamwork": <number 1-10>,
  "variety": <number 1-10>,
  "topAnswers": [<indices of the best 1-3 answers, 0-based>],
  "overallFeedback": "<2-3 sentences of encouraging overall feedback>",
  "improvementTips": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "suggestedAnswers": ["<creative answer they missed 1>", "<creative answer they missed 2>", "<creative answer they missed 3>"],
  "individualFeedback": [
    {"name": "<name>", "praise": "<short praise>", "tip": "<short improvement tip>"}
  ]
}

Be encouraging but honest. Focus on creativity, thinking outside the box, building on teammates' ideas, and variety of responses. Remember these are young students practicing for competition. Score fairly - a perfect 10 should be rare.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up response - remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const feedback = JSON.parse(text);
    res.json(feedback);
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to get AI feedback. Please check your API key.' });
  }
});

// ===== GENERATE QUESTION ENDPOINT =====
app.post('/api/generate-question', async (req, res) => {
  try {
    const { type, difficulty, usedQuestions } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const usedList = (usedQuestions || []).join(', ');
    const avoidClause = usedList ? `\n\nDO NOT generate any of these previously used questions (or very similar ones): [${usedList}]` : '';

    const prompt = `Generate a single Odyssey of the Mind style ${type} spontaneous problem for a team of 7 middle/high school girls. Difficulty level: ${difficulty || 'medium'}.

Types:
- "verbal": A question requiring creative verbal answers (e.g., "Name things that are round", "What would happen if gravity stopped?")
- "word": Give a word and ask creative connections, meanings, uses, or associations${avoidClause}

Return ONLY valid JSON in this format (no markdown):
{
  "question": "<the spontaneous question>",
  "type": "${type}",
  "thinkTime": 60,
  "responseTime": 120,
  "tips": "<brief tip for the team before they start>"
}

Make it fun, creative, and appropriate for the competition level. Be original!`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const questionData = JSON.parse(text);
    res.json(questionData);
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate question.' });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 OOTM Spontaneous Practice App running at http://localhost:${PORT}`);
});

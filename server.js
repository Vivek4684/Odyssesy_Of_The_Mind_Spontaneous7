require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint to get AI feedback on team responses
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

Be encouraging but honest. Focus on creativity, thinking outside the box, building on teammates' ideas, and variety of responses. Remember these are young students practicing for competition.`;

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

// Endpoint to generate a new spontaneous question
app.post('/api/generate-question', async (req, res) => {
  try {
    const { type, difficulty } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate a single Odyssey of the Mind style ${type} spontaneous problem for a team of 7 middle/high school girls. Difficulty level: ${difficulty || 'medium'}.

Types of verbal spontaneous:
- "verbal": A question requiring creative verbal answers (e.g., "Name things that are round", "What would happen if gravity stopped for a day?")
- "word": Give a word or phrase and ask creative uses/meanings/connections

Return ONLY valid JSON in this format (no markdown):
{
  "question": "<the spontaneous question>",
  "type": "${type}",
  "thinkTime": 60,
  "responseTime": 120,
  "tips": "<brief tip for the team before they start>"
}

Make it fun, creative, and appropriate for the competition level.`;

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

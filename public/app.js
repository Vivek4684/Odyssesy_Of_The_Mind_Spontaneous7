// ===== OOTM Spontaneous Practice App =====
// Enhanced with History, Leaderboard, 50+ real practice questions, no-repeat logic

const TEAM_MEMBERS = [
  { name: 'Anvisha', initials: 'AN', color: '#9333ea' },
  { name: 'Swagya', initials: 'SW', color: '#7e22ce' },
  { name: 'Vedika', initials: 'VE', color: '#6b21a8' },
  { name: 'Ishika', initials: 'IS', color: '#a855f7' },
  { name: 'Marianne', initials: 'MA', color: '#c084fc' },
  { name: 'Safiyah', initials: 'SA', color: '#581c87' },
  { name: 'Varsha', initials: 'VA', color: '#d8b4fe' }
];

// ===== 50+ REAL OOTM-STYLE PRACTICE QUESTIONS =====
// Inspired by official Odyssey of the Mind spontaneous problem formats
// Sources: nyodyssey.org, swirlandspark.com, txodyssey.org, k12academics.com
const QUESTION_BANK = [
  // --- VERBAL: "Name things..." style ---
  { id: 'v1', question: "Name things that would be different if humans had eyes in the back of their heads.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about safety, fashion, sports, social situations, and architecture." },
  { id: 'v2', question: "Name things that catch something and what they catch.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think beyond fishing nets! Consider emotions, diseases, eyes catching attention..." },
  { id: 'v3', question: "Name things that are scary but shouldn't be.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about everyday objects, situations, animals that seem scary but are harmless." },
  { id: 'v4', question: "Name things that would happen if animals could vote.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about campaigns, issues animals would care about, political parties." },
  { id: 'v5', question: "Name things you might find in a time traveler's suitcase.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about what you'd need across different eras, souvenirs, survival items." },
  { id: 'v6', question: "State the best thing or worst thing about being the size of an ant.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about perspective, dangers, advantages, everyday objects becoming huge." },
  { id: 'v7', question: "Name things that are better when they're broken.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about records, eggs, dawn (daybreak), silences, codes..." },
  { id: 'v8', question: "Name things a cloud might say if it could talk.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about weather, looking down on earth, feelings, complaints about planes." },
  { id: 'v9', question: "Name ways the world would be different if people could fly.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about transportation, buildings, sports, laws, daily routines." },
  { id: 'v10', question: "Name things that would be in a museum 1000 years from now.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about what's common today that would seem ancient or fascinating later." },
  { id: 'v11', question: "Name problems that could be solved with a very long rope.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think rescue, construction, sports, space, ocean, art, and the unexpected." },
  { id: 'v12', question: "Name things that would happen if everyone in the world spoke the same language.", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think about culture, travel, business, loss, and unexpected consequences." },
  { id: 'v13', question: "Name unusual things you could use as a musical instrument.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about household items, nature, body, machines, food..." },
  { id: 'v14', question: "Name things that would be different if the moon were made of cheese.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about science, food industry, space travel, animals, smell." },
  { id: 'v15', question: "Name things a superhero would NOT want as their superpower.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about embarrassing, inconvenient, or useless powers in hero situations." },
  // --- VERBAL: "What would happen if..." style ---
  { id: 'v16', question: "What would happen if gravity worked sideways every Tuesday?", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think about preparation, buildings, schedule changes, animals, water." },
  { id: 'v17', question: "What would happen if your shadow came to life?", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about personality, activities, disagreements, nighttime, friendship." },
  { id: 'v18', question: "What would happen if trees could walk?", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about forests, parks, neighborhoods, seasons, traffic." },
  { id: 'v19', question: "What would happen if every lie turned your nose a different color?", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about politics, relationships, fashion, makeup industry, trust." },
  { id: 'v20', question: "What would happen if you woke up and discovered you were invisible?", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about daily routine problems, advantages, social situations, proof of existence." },
  { id: 'v21', question: "What would happen if it rained something other than water? What would it rain and why?", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about different substances, helpful or harmful, funny or serious." },
  { id: 'v22', question: "What would happen if all the books in the world suddenly came to life?", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think about characters meeting, genre conflicts, libraries, schools." },
  // --- VERBAL: Creative scenario style ---
  { id: 'v23', question: "You opened a door that says 'Danger - Do Not Enter!' Describe what happened when you opened the door.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Be creative! It could be funny, surprising, or the opposite of what you'd expect." },
  { id: 'v24', question: "Imagine a robot has left an unexpected delivery on your doorstep. What would you do or say about it?", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about what it could be, your reaction, what you'd do with it." },
  { id: 'v25', question: "You discovered a new planet. Describe something unusual about it.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about gravity, inhabitants, landscape, weather, rules of physics." },
  { id: 'v26', question: "You've been appointed mayor of your school for a day. Name a new rule you'd create and why.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think funny, practical, or creatively absurd rules." },
  { id: 'v27', question: "Give a creative excuse for why homework should be abolished.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think scientific, emotional, environmental, historical, or absurd reasons." },
  { id: 'v28', question: "Describe a new holiday that doesn't exist yet. What would people celebrate and how?", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about traditions, food, activities, the reason for celebrating." },
  { id: 'v29', question: "You're an inventor. Describe a gadget that solves an everyday annoyance.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about morning routine, school, chores, weather, siblings." },
  { id: 'v30', question: "Name things that would be in a vending machine from the future.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think technology, food, experiences, emotions, knowledge." },
  // --- VERBAL: Compare/contrast style ---
  { id: 'v31', question: "Name things that are both a strength and a weakness.", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think about traits, materials, concepts, emotions, and nature." },
  { id: 'v32', question: "Name things that are opposites but need each other.", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think yin/yang, day/night, but also less obvious pairs." },
  { id: 'v33', question: "Name things that start small but become very big.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think literally and figuratively - nature, ideas, rumors, events." },
  { id: 'v34', question: "Name things that are loud but shouldn't be, or quiet but shouldn't be.", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think about situations, animals, objects, people, natural events." },
  { id: 'v35', question: "Name something that is fast and something that is slow, then explain how they are similar.", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "The connection is the creative part! Think abstract similarities." },
  // --- VERBAL: "Give a response that includes..." style ---
  { id: 'v36', question: "Give a response that includes the phrase 'should not' in a funny way.", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think about animals, food, school, or objects doing things they shouldn't." },
  { id: 'v37', question: "Complete this sentence creatively: 'The last thing you'd expect to find in a library is...'", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Think absurd, unexpected, funny, or ironic." },
  { id: 'v38', question: "Give creative responses to: 'You know you're having a bad day when...'", type: "verbal", difficulty: "easy", thinkTime: 60, responseTime: 120, tips: "Go beyond the obvious! Think surreal, fantastical, or cleverly exaggerated." },
  { id: 'v39', question: "Name creative ways to use an ordinary pencil (besides writing or drawing).", type: "verbal", difficulty: "medium", thinkTime: 60, responseTime: 120, tips: "Think construction, music, science, fashion, cooking, sports." },
  { id: 'v40', question: "Explain how a common object could save the world. Name the object and how.", type: "verbal", difficulty: "hard", thinkTime: 60, responseTime: 120, tips: "Think about chain reactions, unexpected properties, inspiration." },
  // --- WORD ASSOCIATION ---
  { id: 'w1', question: "The word is 'BRIDGE'. Give creative responses — meanings, connections, or uses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think physical bridges, emotional bridges, card games, dental work, music..." },
  { id: 'w2', question: "The word is 'LIGHT'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Consider physics, emotions, weight, enlightenment, colors, speed." },
  { id: 'w3', question: "The word is 'SPACE'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Think outer space, personal space, blank space, spacing out, keyboard space bar." },
  { id: 'w4', question: "The word is 'CURRENT'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think electricity, water, news, time (current events), currents of air." },
  { id: 'w5', question: "The word is 'SCALE'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think fish scales, musical scales, weighing scales, scaling walls, scale models." },
  { id: 'w6', question: "The word is 'FIRE'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Think flames, being fired, firing pottery, campfire stories, fire ants, passion." },
  { id: 'w7', question: "The word is 'WAVE'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Think ocean, greeting, sound waves, heat waves, waving flags, wave of emotion." },
  { id: 'w8', question: "The word is 'SHARP'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think knives, sharp mind, sharp dresser, music (sharp note), sharp turn." },
  { id: 'w9', question: "The word is 'PITCH'. Give creative responses related to this word.", type: "word", difficulty: "hard", thinkTime: 45, responseTime: 120, tips: "Think baseball, sales pitch, musical pitch, pitch black, tar pitch, pitch a tent." },
  { id: 'w10', question: "The word is 'SPRING'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Think season, water spring, coil spring, spring into action, springboard." },
  { id: 'w11', question: "The word is 'CHARGE'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think electricity, cavalry charge, credit card charge, being in charge, charging a phone." },
  { id: 'w12', question: "The word is 'BREAK'. Give creative responses related to this word.", type: "word", difficulty: "easy", thinkTime: 45, responseTime: 120, tips: "Think break dance, break a record, break of dawn, commercial break, heartbreak." },
  { id: 'w13', question: "The word is 'DIAMOND'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think jewelry, baseball diamond, diamond shapes, playing cards, hardness, pressure." },
  { id: 'w14', question: "The word is 'CROWN'. Give creative responses related to this word.", type: "word", difficulty: "medium", thinkTime: 45, responseTime: 120, tips: "Think royalty, dental crown, crown of a hill, crowning achievement, crown molding." },
  { id: 'w15', question: "The word is 'GRAVITY'. Give creative responses related to this word.", type: "word", difficulty: "hard", thinkTime: 45, responseTime: 120, tips: "Think physics, seriousness (grave/gravity), the movie, center of gravity, defying gravity." },
];



// App State
let state = {
  selectedMembers: [],
  currentQuestion: null,
  phase: 'idle', // idle, thinking, responding, done
  currentSpeakerIndex: 0,
  responses: [],
  timerInterval: null,
  timeRemaining: 0,
  totalTime: 0,
  recognition: null,
  isListening: false,
  roundNumber: 0,
  usedQuestionIds: [],
  history: [],
  leaderboard: {}
};

// DOM Elements
const screens = {
  welcome: document.getElementById('screen-welcome'),
  practice: document.getElementById('screen-practice'),
  results: document.getElementById('screen-results'),
  history: document.getElementById('screen-history'),
  leaderboard: document.getElementById('screen-leaderboard')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initMembersGrid();
  initEventListeners();
  loadUsedQuestions();
  loadHistory();
  loadLeaderboard();
});

function initMembersGrid() {
  const grid = document.getElementById('members-grid');
  grid.innerHTML = TEAM_MEMBERS.map((member, i) => `
    <div class="member-card" data-index="${i}" onclick="toggleMember(${i})">
      <div class="member-avatar" style="background: linear-gradient(135deg, ${member.color}, ${member.color}dd)">
        ${member.initials}
      </div>
      <span class="member-name">${member.name}</span>
    </div>
  `).join('');
}

function initEventListeners() {
  document.getElementById('btn-start').addEventListener('click', startPractice);
  document.getElementById('btn-next-speaker').addEventListener('click', nextSpeaker);
  document.getElementById('btn-skip-speech').addEventListener('click', showTextInput);
  document.getElementById('btn-submit-text').addEventListener('click', submitTextAnswer);
  document.getElementById('btn-play-again').addEventListener('click', playAgain);
  document.getElementById('btn-new-team').addEventListener('click', newTeam);
  document.getElementById('btn-history').addEventListener('click', showHistory);
  document.getElementById('btn-leaderboard').addEventListener('click', showLeaderboard);
  document.getElementById('btn-back-from-history').addEventListener('click', () => showScreen('welcome'));
  document.getElementById('btn-back-from-leaderboard').addEventListener('click', () => showScreen('welcome'));
  document.getElementById('btn-clear-history').addEventListener('click', clearHistory);
  document.getElementById('btn-reset-questions').addEventListener('click', resetUsedQuestions);

  // Enter key for text input
  document.getElementById('text-answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitTextAnswer();
  });
}

// ===== DATA LOADING =====
async function loadUsedQuestions() {
  try {
    const res = await fetch('/api/used-questions');
    if (res.ok) state.usedQuestionIds = await res.json();
  } catch (e) { console.log('Using local used questions tracking'); }
}

async function loadHistory() {
  try {
    const res = await fetch('/api/history');
    if (res.ok) state.history = await res.json();
  } catch (e) { console.log('History unavailable'); }
}

async function loadLeaderboard() {
  try {
    const res = await fetch('/api/leaderboard');
    if (res.ok) state.leaderboard = await res.json();
  } catch (e) { console.log('Leaderboard unavailable'); }
}

// ===== TEAM SELECTION =====
function toggleMember(index) {
  const card = document.querySelector(`.member-card[data-index="${index}"]`);
  const isSelected = state.selectedMembers.includes(index);

  if (isSelected) {
    state.selectedMembers = state.selectedMembers.filter(i => i !== index);
    card.classList.remove('selected');
  } else {
    state.selectedMembers.push(index);
    card.classList.add('selected');
  }

  document.getElementById('btn-start').disabled = state.selectedMembers.length === 0;
}

// ===== QUESTION SELECTION (NO REPEAT) =====
function getNextQuestion(type, difficulty) {
  // Filter available questions
  let available = QUESTION_BANK.filter(q => {
    const matchType = type === 'both' || q.type === type;
    const matchDifficulty = difficulty === 'any' || q.difficulty === difficulty;
    const notUsed = !state.usedQuestionIds.includes(q.id);
    return matchType && matchDifficulty && notUsed;
  });

  // If all questions used, reset and notify
  if (available.length === 0) {
    available = QUESTION_BANK.filter(q => {
      const matchType = type === 'both' || q.type === type;
      const matchDifficulty = difficulty === 'any' || q.difficulty === difficulty;
      return matchType && matchDifficulty;
    });
    // Reset used questions for this category
    state.usedQuestionIds = state.usedQuestionIds.filter(id => {
      const q = QUESTION_BANK.find(q => q.id === id);
      return q && q.type !== type;
    });
  }

  if (available.length === 0) return null;

  // Pick random from available
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

async function markQuestionUsed(questionId) {
  state.usedQuestionIds.push(questionId);
  try {
    await fetch('/api/used-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId })
    });
  } catch (e) { /* local tracking suffices */ }
}

// ===== START PRACTICE =====
async function startPractice() {
  state.roundNumber++;
  state.responses = [];
  state.currentSpeakerIndex = 0;

  const questionType = document.getElementById('question-type').value;
  const difficulty = document.getElementById('difficulty').value;

  showScreen('practice');
  document.getElementById('question-text').textContent = 'Loading question...';
  document.getElementById('question-tip').textContent = '';
  document.getElementById('responses-list').innerHTML = '';

  // Try local question bank first (guaranteed no repeat)
  let question = getNextQuestion(questionType, difficulty);

  if (question) {
    state.currentQuestion = question;
    await markQuestionUsed(question.id);
  } else {
    // Fallback to AI-generated question
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: questionType,
          difficulty,
          usedQuestions: state.usedQuestionIds.map(id => {
            const q = QUESTION_BANK.find(q => q.id === id);
            return q ? q.question : '';
          }).filter(Boolean).slice(-10) // send last 10 to avoid repetition
        })
      });

      if (response.ok) {
        const data = await response.json();
        state.currentQuestion = data;
        // Track AI question with generated id
        const aiId = 'ai_' + Date.now();
        state.currentQuestion.id = aiId;
        await markQuestionUsed(aiId);
      } else {
        throw new Error('API fail');
      }
    } catch (error) {
      // Ultimate fallback
      state.currentQuestion = QUESTION_BANK[Math.floor(Math.random() * QUESTION_BANK.length)];
    }
  }

  displayQuestion();
  startThinkTime();
}

function displayQuestion() {
  document.getElementById('question-text').textContent = state.currentQuestion.question;
  document.getElementById('question-tip').textContent = state.currentQuestion.tips ? `Tip: ${state.currentQuestion.tips}` : '';
  
  // Show remaining questions count
  const type = document.getElementById('question-type').value;
  const available = QUESTION_BANK.filter(q => 
    (type === 'both' || q.type === type) && !state.usedQuestionIds.includes(q.id)
  ).length;
  document.getElementById('questions-remaining').textContent = `${available} questions remaining in bank`;
}

// ===== TIMER =====
function startThinkTime() {
  state.phase = 'thinking';
  state.timeRemaining = state.currentQuestion.thinkTime || 60;
  state.totalTime = state.timeRemaining;

  updatePhaseUI('Think Time', 'fas fa-lightbulb');
  document.getElementById('current-turn').textContent = 'Everyone think silently...';
  document.getElementById('speaker-area').classList.add('hidden');
  document.getElementById('text-input-area').classList.add('hidden');

  startTimer(() => {
    startResponsePhase();
  });
}

function startResponsePhase() {
  state.phase = 'responding';
  state.timeRemaining = state.currentQuestion.responseTime || 120;
  state.totalTime = state.timeRemaining;

  updatePhaseUI('Response Time', 'fas fa-microphone');
  document.getElementById('speaker-area').classList.remove('hidden');

  shuffleOrder();
  activateCurrentSpeaker();

  startTimer(() => {
    endRound();
  });
}

function startTimer(onComplete) {
  clearInterval(state.timerInterval);
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timeRemaining--;
    updateTimerDisplay();

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval);
      onComplete();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerText = document.getElementById('timer-text');
  const timerProgress = document.getElementById('timer-progress');
  const circumference = 283;

  timerText.textContent = state.timeRemaining;

  const progress = (1 - state.timeRemaining / state.totalTime) * circumference;
  timerProgress.style.strokeDashoffset = progress;

  timerProgress.classList.remove('warning', 'danger');
  if (state.timeRemaining <= 10) {
    timerProgress.classList.add('danger');
  } else if (state.timeRemaining <= 30) {
    timerProgress.classList.add('warning');
  }
}

function updatePhaseUI(label, iconClass) {
  document.getElementById('phase-label').textContent = label;
  document.getElementById('phase-icon').innerHTML = `<i class="${iconClass}"></i>`;
}

// ===== SPEAKING TURNS =====
function shuffleOrder() {
  for (let i = state.selectedMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.selectedMembers[i], state.selectedMembers[j]] = [state.selectedMembers[j], state.selectedMembers[i]];
  }
}

function activateCurrentSpeaker() {
  if (state.currentSpeakerIndex >= state.selectedMembers.length) {
    state.currentSpeakerIndex = 0;
  }

  const memberIndex = state.selectedMembers[state.currentSpeakerIndex];
  const member = TEAM_MEMBERS[memberIndex];

  document.getElementById('speaker-name').textContent = member.name;
  document.getElementById('speaker-avatar').style.background = `linear-gradient(135deg, ${member.color}, ${member.color}dd)`;
  document.getElementById('speaker-card').classList.add('active');
  document.getElementById('current-turn').textContent = `${member.name}'s turn (${state.responses.length + 1} responses so far)`;
  document.getElementById('transcript-live').textContent = 'Listening...';
  document.getElementById('text-input-area').classList.add('hidden');

  startListening();
}

// ===== SPEECH RECOGNITION =====
function startListening() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    document.getElementById('transcript-live').textContent = 'Speech not supported - use "Type Instead" button';
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;
  state.recognition.interimResults = true;
  state.recognition.lang = 'en-US';

  state.recognition.onstart = () => {
    state.isListening = true;
    document.getElementById('speaker-avatar').classList.add('listening');
    document.getElementById('speech-indicator').classList.add('active');
  };

  state.recognition.onresult = (event) => {
    let transcript = '';
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById('transcript-live').textContent = transcript || 'Listening...';

    if (event.results[0].isFinal) {
      submitAnswer(transcript);
    }
  };

  state.recognition.onerror = (event) => {
    console.log('Speech error:', event.error);
    if (event.error === 'no-speech') {
      document.getElementById('transcript-live').textContent = 'No speech detected. Try again or type instead.';
    }
  };

  state.recognition.onend = () => {
    state.isListening = false;
    document.getElementById('speaker-avatar').classList.remove('listening');
    document.getElementById('speech-indicator').classList.remove('active');
  };

  state.recognition.start();
}

function stopListening() {
  if (state.recognition) {
    state.recognition.abort();
    state.isListening = false;
  }
  document.getElementById('speaker-avatar').classList.remove('listening');
  document.getElementById('speech-indicator').classList.remove('active');
}



// ===== ANSWER SUBMISSION =====
function submitAnswer(text) {
  if (!text || text.trim() === '') return;

  stopListening();

  const memberIndex = state.selectedMembers[state.currentSpeakerIndex];
  const member = TEAM_MEMBERS[memberIndex];

  state.responses.push({
    name: member.name,
    answer: text.trim()
  });

  addResponseToList(member.name, text.trim());
  advanceToNextSpeaker();
}

function nextSpeaker() {
  stopListening();

  const memberIndex = state.selectedMembers[state.currentSpeakerIndex];
  const member = TEAM_MEMBERS[memberIndex];

  const transcript = document.getElementById('transcript-live').textContent;
  if (transcript && transcript !== 'Listening...' && transcript !== 'No speech detected. Try again or type instead.' && !transcript.startsWith('Speech not supported')) {
    state.responses.push({
      name: member.name,
      answer: transcript.trim()
    });
    addResponseToList(member.name, transcript.trim());
  }

  advanceToNextSpeaker();
}

function advanceToNextSpeaker() {
  state.currentSpeakerIndex++;
  document.getElementById('speaker-card').classList.remove('active');

  if (state.phase === 'responding' && state.timeRemaining > 0) {
    setTimeout(() => activateCurrentSpeaker(), 500);
  }
}

function showTextInput() {
  stopListening();
  document.getElementById('text-input-area').classList.remove('hidden');
  document.getElementById('text-answer').focus();
}

function submitTextAnswer() {
  const input = document.getElementById('text-answer');
  const text = input.value.trim();
  if (!text) return;

  submitAnswer(text);
  input.value = '';
  document.getElementById('text-input-area').classList.add('hidden');
}

function addResponseToList(name, text) {
  const list = document.getElementById('responses-list');
  const item = document.createElement('div');
  item.className = 'response-item';
  item.innerHTML = `
    <span class="resp-name">${name}</span>
    <span class="resp-text">${text}</span>
  `;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

// ===== END ROUND =====
async function endRound() {
  state.phase = 'done';
  stopListening();
  clearInterval(state.timerInterval);

  if (state.responses.length === 0) {
    alert('No responses were recorded. Try again!');
    showScreen('welcome');
    return;
  }

  document.getElementById('loading-overlay').classList.remove('hidden');

  let feedback;
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: state.currentQuestion.question,
        responses: state.responses,
        questionType: state.currentQuestion.type
      })
    });

    if (response.ok) {
      feedback = await response.json();
    } else {
      throw new Error('Feedback API failed');
    }
  } catch (error) {
    console.error('Error getting feedback:', error);
    feedback = generateFallbackFeedback();
  }

  // Save to history
  await saveHistory(feedback);
  // Update leaderboard
  await updateLeaderboard(feedback);

  document.getElementById('loading-overlay').classList.add('hidden');
  showResults(feedback);
}

function generateFallbackFeedback() {
  return {
    overallScore: 7,
    creativity: 7,
    teamwork: 7,
    variety: 6,
    topAnswers: [0],
    overallFeedback: "Great effort team! You showed good creativity and teamwork. Keep practicing to build on each other's ideas more.",
    improvementTips: [
      "Try to think of answers in different categories (funny, serious, scientific, artistic)",
      "Build on what your teammates say - use the 'yes, and...' technique",
      "Don't be afraid of silly answers - they often score well for creativity!"
    ],
    suggestedAnswers: [
      "Consider thinking about the question from an unusual perspective",
      "Try connecting unrelated concepts for creative answers",
      "Think about how the question relates to different time periods"
    ],
    individualFeedback: state.responses.map(r => ({
      name: r.name,
      praise: "Good contribution!",
      tip: "Try to be even more specific and detailed."
    }))
  };
}

// ===== SAVE HISTORY =====
async function saveHistory(feedback) {
  const entry = {
    question: state.currentQuestion.question,
    questionType: state.currentQuestion.type,
    participants: state.selectedMembers.map(i => TEAM_MEMBERS[i].name),
    responses: state.responses,
    scores: {
      overall: feedback.overallScore,
      creativity: feedback.creativity,
      teamwork: feedback.teamwork,
      variety: feedback.variety
    },
    feedback: feedback.overallFeedback
  };

  try {
    const res = await fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
    if (res.ok) {
      const saved = await res.json();
      state.history.unshift(saved);
    }
  } catch (e) {
    // Save locally
    entry.id = Date.now().toString();
    entry.date = new Date().toISOString();
    state.history.unshift(entry);
  }
}

// ===== UPDATE LEADERBOARD =====
async function updateLeaderboard(feedback) {
  const participants = state.selectedMembers.map(i => TEAM_MEMBERS[i].name);

  for (const name of participants) {
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          scores: {
            overall: feedback.overallScore,
            creativity: feedback.creativity,
            teamwork: feedback.teamwork,
            variety: feedback.variety
          }
        })
      });
    } catch (e) { /* continue */ }
  }

  // Reload leaderboard
  await loadLeaderboard();
}

// ===== RESULTS DISPLAY =====
function showResults(feedback) {
  showScreen('results');

  document.getElementById('score-number').textContent = feedback.overallScore;

  setTimeout(() => {
    document.getElementById('bar-creativity').style.width = `${feedback.creativity * 10}%`;
    document.getElementById('val-creativity').textContent = `${feedback.creativity}/10`;

    document.getElementById('bar-teamwork').style.width = `${feedback.teamwork * 10}%`;
    document.getElementById('val-teamwork').textContent = `${feedback.teamwork}/10`;

    document.getElementById('bar-variety').style.width = `${feedback.variety * 10}%`;
    document.getElementById('val-variety').textContent = `${feedback.variety}/10`;
  }, 300);

  document.getElementById('feedback-text').textContent = feedback.overallFeedback;

  const tipsList = document.getElementById('tips-list');
  tipsList.innerHTML = feedback.improvementTips.map(tip => `<li>${tip}</li>`).join('');

  const suggestedList = document.getElementById('suggested-list');
  suggestedList.innerHTML = feedback.suggestedAnswers.map(ans => `<li>${ans}</li>`).join('');

  const individualDiv = document.getElementById('individual-feedback');
  if (feedback.individualFeedback && feedback.individualFeedback.length > 0) {
    individualDiv.innerHTML = feedback.individualFeedback.map(ind => `
      <div class="individual-card">
        <div>
          <div class="ind-name">${ind.name}</div>
          <div class="ind-praise">${ind.praise}</div>
          <div class="ind-tip">${ind.tip}</div>
        </div>
      </div>
    `).join('');
  }

  if (feedback.topAnswers) {
    feedback.topAnswers.forEach(idx => {
      const items = document.querySelectorAll('#screen-results .response-item');
      if (items[idx]) items[idx].classList.add('top-answer');
    });
  }
}

// ===== HISTORY SCREEN =====
function showHistory() {
  showScreen('history');
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('history-list');

  if (state.history.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-clock-rotate-left"></i><p>No practice sessions yet. Start practicing to see your history!</p></div>';
    return;
  }

  container.innerHTML = state.history.map((entry, idx) => {
    const date = new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const participants = entry.participants ? entry.participants.join(', ') : 'Team';
    const score = entry.scores ? entry.scores.overall : '?';
    const scoreClass = score >= 8 ? 'score-high' : score >= 6 ? 'score-mid' : 'score-low';

    return `
      <div class="history-item" onclick="toggleHistoryDetail(${idx})">
        <div class="history-item-header">
          <div class="history-meta">
            <span class="history-date">${date}</span>
            <span class="history-type badge-${entry.questionType}">${entry.questionType}</span>
          </div>
          <div class="history-score ${scoreClass}">${score}/10</div>
        </div>
        <div class="history-question">${entry.question}</div>
        <div class="history-participants"><i class="fas fa-users"></i> ${participants}</div>
        <div class="history-detail hidden" id="history-detail-${idx}">
          <div class="history-responses">
            <strong>Responses:</strong>
            ${(entry.responses || []).map(r => `<div class="history-resp"><span class="resp-name">${r.name}:</span> ${r.answer}</div>`).join('')}
          </div>
          ${entry.feedback ? `<div class="history-feedback"><strong>Feedback:</strong> ${entry.feedback}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleHistoryDetail(idx) {
  const detail = document.getElementById(`history-detail-${idx}`);
  if (detail) detail.classList.toggle('hidden');
}

async function clearHistory() {
  if (!confirm('Are you sure you want to clear all practice history?')) return;
  try {
    await fetch('/api/history', { method: 'DELETE' });
  } catch (e) { /* ok */ }
  state.history = [];
  renderHistory();
}

async function resetUsedQuestions() {
  if (!confirm('Reset question bank? All questions will be available again.')) return;
  try {
    await fetch('/api/used-questions', { method: 'DELETE' });
  } catch (e) { /* ok */ }
  state.usedQuestionIds = [];
  alert('Question bank reset! All questions are available again.');
}

// ===== LEADERBOARD SCREEN =====
function showLeaderboard() {
  showScreen('leaderboard');
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  const entries = Object.entries(state.leaderboard);

  if (entries.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-trophy"></i><p>No scores yet. Complete a practice session to see the leaderboard!</p></div>';
    return;
  }

  // Sort by average overall score
  entries.sort((a, b) => {
    const avgA = a[1].totalOverall / a[1].totalSessions;
    const avgB = b[1].totalOverall / b[1].totalSessions;
    return avgB - avgA;
  });

  const badgeIcons = {
    dedicated: { icon: 'fa-medal', label: 'Dedicated (5+ sessions)', color: '#a855f7' },
    veteran: { icon: 'fa-crown', label: 'Veteran (20+ sessions)', color: '#fbbf24' },
    superstar: { icon: 'fa-star', label: 'Superstar (9+ score)', color: '#f59e0b' },
    on_fire: { icon: 'fa-fire', label: 'On Fire (7 day streak)', color: '#ef4444' },
    creative_genius: { icon: 'fa-palette', label: 'Creative Genius (avg 8+ creativity)', color: '#8b5cf6' }
  };

  container.innerHTML = entries.map(([name, data], idx) => {
    const avg = (data.totalOverall / data.totalSessions).toFixed(1);
    const avgCreativity = (data.totalCreativity / data.totalSessions).toFixed(1);
    const avgTeamwork = (data.totalTeamwork / data.totalSessions).toFixed(1);
    const avgVariety = (data.totalVariety / data.totalSessions).toFixed(1);
    const rankIcon = idx === 0 ? '<i class="fas fa-trophy" style="color:#fbbf24"></i>' : idx === 1 ? '<i class="fas fa-trophy" style="color:#94a3b8"></i>' : idx === 2 ? '<i class="fas fa-trophy" style="color:#d97706"></i>' : `<span class="rank-number">${idx + 1}</span>`;

    const badges = (data.badges || []).map(b => {
      const badge = badgeIcons[b];
      return badge ? `<span class="badge-icon" title="${badge.label}"><i class="fas ${badge.icon}" style="color:${badge.color}"></i></span>` : '';
    }).join('');

    const member = TEAM_MEMBERS.find(m => m.name === name);
    const color = member ? member.color : '#9333ea';

    return `
      <div class="leaderboard-item">
        <div class="lb-rank">${rankIcon}</div>
        <div class="lb-avatar" style="background: linear-gradient(135deg, ${color}, ${color}dd)">${name.substring(0, 2).toUpperCase()}</div>
        <div class="lb-info">
          <div class="lb-name">${name} ${badges}</div>
          <div class="lb-stats">
            <span><i class="fas fa-gamepad"></i> ${data.totalSessions} sessions</span>
            <span><i class="fas fa-fire"></i> ${data.streak} day streak</span>
            <span><i class="fas fa-star"></i> Best: ${data.bestScore}/10</span>
          </div>
          <div class="lb-scores">
            <span class="lb-score-item">Avg: <strong>${avg}</strong></span>
            <span class="lb-score-item">Creativity: <strong>${avgCreativity}</strong></span>
            <span class="lb-score-item">Teamwork: <strong>${avgTeamwork}</strong></span>
            <span class="lb-score-item">Variety: <strong>${avgVariety}</strong></span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== NAVIGATION =====
function showScreen(screenName) {
  Object.values(screens).forEach(s => { if (s) s.classList.remove('active'); });
  if (screens[screenName]) screens[screenName].classList.add('active');
}

function playAgain() {
  document.getElementById('responses-list').innerHTML = '';
  document.getElementById('bar-creativity').style.width = '0%';
  document.getElementById('bar-teamwork').style.width = '0%';
  document.getElementById('bar-variety').style.width = '0%';
  startPractice();
}

function newTeam() {
  state.selectedMembers = [];
  state.responses = [];
  state.roundNumber = 0;
  document.getElementById('responses-list').innerHTML = '';
  document.getElementById('bar-creativity').style.width = '0%';
  document.getElementById('bar-teamwork').style.width = '0%';
  document.getElementById('bar-variety').style.width = '0%';

  document.querySelectorAll('.member-card').forEach(card => card.classList.remove('selected'));
  document.getElementById('btn-start').disabled = true;

  showScreen('welcome');
}

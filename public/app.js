// ===== OOTM Spontaneous Practice App =====

const TEAM_MEMBERS = [
  { name: 'Anvisha', initials: 'AN', color: '#9333ea' },
  { name: 'Swagya', initials: 'SW', color: '#7e22ce' },
  { name: 'Vedika', initials: 'VE', color: '#6b21a8' },
  { name: 'Ishika', initials: 'IS', color: '#a855f7' },
  { name: 'Marianne', initials: 'MA', color: '#c084fc' },
  { name: 'Safiyah', initials: 'SA', color: '#581c87' },
  { name: 'Varsha', initials: 'VA', color: '#d8b4fe' }
];

// Fallback questions if API is unavailable
const FALLBACK_QUESTIONS = [
  { question: "Name things that would be different if humans could fly.", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think about everyday activities, transportation, architecture, and society." },
  { question: "What are creative uses for an empty cardboard box?", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Go beyond the obvious! Think small, think big, think silly." },
  { question: "Name things that are both a strength and a weakness.", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think about traits, materials, concepts, and nature." },
  { question: "What would happen if animals could talk?", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Consider pets, wildlife, farms, and the food industry." },
  { question: "Name things that start small but become big.", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think literally and figuratively - nature, ideas, events." },
  { question: "The word is 'BRIDGE'. Give creative responses related to this word.", type: "word", thinkTime: 45, responseTime: 120, tips: "Think of different meanings, connections, and metaphors." },
  { question: "Name things you might find in the year 3000.", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think technology, society, environment, and daily life." },
  { question: "What problems could be solved with a really long rope?", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think rescue, construction, fun, space, ocean, and the unexpected." },
  { question: "The word is 'LIGHT'. Give creative responses related to this word.", type: "word", thinkTime: 45, responseTime: 120, tips: "Consider different contexts: physics, emotions, weight, enlightenment." },
  { question: "Name things that would be in a museum of the future.", type: "verbal", thinkTime: 60, responseTime: 120, tips: "Think about what's common today that might be obsolete or fascinating later." }
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
  roundNumber: 0
};

// DOM Elements
const screens = {
  welcome: document.getElementById('screen-welcome'),
  practice: document.getElementById('screen-practice'),
  results: document.getElementById('screen-results')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initMembersGrid();
  initEventListeners();
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

  // Enter key for text input
  document.getElementById('text-answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitTextAnswer();
  });
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

  // Enable start button if at least 1 member selected
  document.getElementById('btn-start').disabled = state.selectedMembers.length === 0;
}

// ===== START PRACTICE =====
async function startPractice() {
  state.roundNumber++;
  state.responses = [];
  state.currentSpeakerIndex = 0;

  // Get question
  const questionType = document.getElementById('question-type').value;
  const difficulty = document.getElementById('difficulty').value;

  showScreen('practice');
  document.getElementById('question-text').textContent = 'Loading question...';
  document.getElementById('question-tip').textContent = '';

  try {
    const response = await fetch('/api/generate-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: questionType, difficulty })
    });

    if (response.ok) {
      state.currentQuestion = await response.json();
    } else {
      throw new Error('API unavailable');
    }
  } catch (error) {
    // Use fallback question
    state.currentQuestion = FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)];
  }

  displayQuestion();
  startThinkTime();
}

function displayQuestion() {
  document.getElementById('question-text').textContent = state.currentQuestion.question;
  document.getElementById('question-tip').textContent = state.currentQuestion.tips ? `💡 Tip: ${state.currentQuestion.tips}` : '';
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

  // Shuffle the order for fairness
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
  const circumference = 283; // 2 * PI * 45

  timerText.textContent = state.timeRemaining;

  const progress = (1 - state.timeRemaining / state.totalTime) * circumference;
  timerProgress.style.strokeDashoffset = progress;

  // Color changes
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
  // Fisher-Yates shuffle for fair turn order
  for (let i = state.selectedMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.selectedMembers[i], state.selectedMembers[j]] = [state.selectedMembers[j], state.selectedMembers[i]];
  }
}

function activateCurrentSpeaker() {
  if (state.currentSpeakerIndex >= state.selectedMembers.length) {
    // All members have answered once, loop back
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
    document.getElementById('transcript-live').textContent = '⚠️ Speech not supported - use "Type Instead" button';
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

    // If final result
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
  // Pass or move to next
  stopListening();

  const memberIndex = state.selectedMembers[state.currentSpeakerIndex];
  const member = TEAM_MEMBERS[memberIndex];

  // Check if there's a partial transcript
  const transcript = document.getElementById('transcript-live').textContent;
  if (transcript && transcript !== 'Listening...' && transcript !== 'No speech detected. Try again or type instead.' && !transcript.startsWith('⚠️')) {
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

  // Show loading and get AI feedback
  document.getElementById('loading-overlay').classList.remove('hidden');

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
      const feedback = await response.json();
      showResults(feedback);
    } else {
      throw new Error('Feedback API failed');
    }
  } catch (error) {
    console.error('Error getting feedback:', error);
    showResults(generateFallbackFeedback());
  }

  document.getElementById('loading-overlay').classList.add('hidden');
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
      "Build on what your teammates say - 'yes, and...' technique",
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

// ===== RESULTS DISPLAY =====
function showResults(feedback) {
  showScreen('results');

  // Overall Score
  document.getElementById('score-number').textContent = feedback.overallScore;

  // Score bars (animate after small delay)
  setTimeout(() => {
    document.getElementById('bar-creativity').style.width = `${feedback.creativity * 10}%`;
    document.getElementById('val-creativity').textContent = `${feedback.creativity}/10`;

    document.getElementById('bar-teamwork').style.width = `${feedback.teamwork * 10}%`;
    document.getElementById('val-teamwork').textContent = `${feedback.teamwork}/10`;

    document.getElementById('bar-variety').style.width = `${feedback.variety * 10}%`;
    document.getElementById('val-variety').textContent = `${feedback.variety}/10`;
  }, 300);

  // Overall feedback
  document.getElementById('feedback-text').textContent = feedback.overallFeedback;

  // Tips
  const tipsList = document.getElementById('tips-list');
  tipsList.innerHTML = feedback.improvementTips.map(tip => `<li>${tip}</li>`).join('');

  // Suggested answers
  const suggestedList = document.getElementById('suggested-list');
  suggestedList.innerHTML = feedback.suggestedAnswers.map(ans => `<li>${ans}</li>`).join('');

  // Individual feedback
  const individualDiv = document.getElementById('individual-feedback');
  if (feedback.individualFeedback && feedback.individualFeedback.length > 0) {
    individualDiv.innerHTML = feedback.individualFeedback.map(ind => `
      <div class="individual-card">
        <div>
          <div class="ind-name">${ind.name}</div>
          <div class="ind-praise">✅ ${ind.praise}</div>
          <div class="ind-tip">📝 ${ind.tip}</div>
        </div>
      </div>
    `).join('');
  }

  // Highlight top answers in responses tracker if visible
  if (feedback.topAnswers) {
    feedback.topAnswers.forEach(idx => {
      const items = document.querySelectorAll('.response-item');
      if (items[idx]) items[idx].classList.add('top-answer');
    });
  }
}

// ===== NAVIGATION =====
function showScreen(screenName) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[screenName].classList.add('active');
}

function playAgain() {
  // Reset for another round with same team
  document.getElementById('responses-list').innerHTML = '';
  
  // Reset score bars
  document.getElementById('bar-creativity').style.width = '0%';
  document.getElementById('bar-teamwork').style.width = '0%';
  document.getElementById('bar-variety').style.width = '0%';
  
  startPractice();
}

function newTeam() {
  // Full reset
  state.selectedMembers = [];
  state.responses = [];
  state.roundNumber = 0;
  document.getElementById('responses-list').innerHTML = '';
  
  // Reset score bars
  document.getElementById('bar-creativity').style.width = '0%';
  document.getElementById('bar-teamwork').style.width = '0%';
  document.getElementById('bar-variety').style.width = '0%';

  // Deselect all members
  document.querySelectorAll('.member-card').forEach(card => card.classList.remove('selected'));
  document.getElementById('btn-start').disabled = true;

  showScreen('welcome');
}

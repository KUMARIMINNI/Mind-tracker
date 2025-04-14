
let xp = 0;
let level = 1;

function switchPersona(type) {
  document.body.className = '';
  if (type === 'focus') {
    document.body.classList.add('theme-focus');
  } else if (type === 'heal') {
    document.body.classList.add('theme-heal');
  } else if (type === 'dream') {
    document.body.classList.add('theme-dream');
  }
  localStorage.setItem('persona', type);
}

function updateMood() {
  const mood = document.getElementById('moodSelect').value;
  const face = document.getElementById('moodFace');
  const text = document.getElementById('moodText');

  switch (mood) {
    case 'happy':
      face.textContent = ':)';
      text.textContent = 'Feeling good';
      break;
    case 'neutral':
      face.textContent = ':|';
      text.textContent = 'Feeling okay';
      break;
    case 'sad':
      face.textContent = ':('; 
      text.textContent = 'Feeling low';
      break;
    case 'angry':
      face.textContent = '>:( ';
      text.textContent = 'Feeling angry';
      break;
    case 'anxious':
      face.textContent = ':S';
      text.textContent = 'Feeling anxious';
      break;
  }
}

function adjustLoad(value) {
  const fill = document.getElementById('loadFill');
  const history = document.getElementById('loadHistory');
  fill.style.width = value + '%';
  history.textContent = 'Last adjusted: ' + value + '%';
  fill.style.background = `linear-gradient(to right, #ff8a00, #e52e71)`;
  fill.style.boxShadow = `0 0 10px rgba(255, 138, 0, 0.8)`;
}

function gainXP(amount) {
  xp += amount;
  document.getElementById('xp').textContent = xp;
  updateLevel();
  updateBadges();
}

function updateLevel() {
  level = Math.floor(xp / 100) + 1;
  document.getElementById('levelInfo').textContent = 'Level: ' + level;
}

function updateBadges() {
  const badgeContainer = document.getElementById('badges');
  badgeContainer.innerHTML = '';

  if (xp >= 100) {
    badgeContainer.innerHTML += '<span class="badge">🧠 Focus Adept</span>';
  }
  if (xp >= 200) {
    badgeContainer.innerHTML += '<span class="badge">🧘‍♀️ Resilience Guardian</span>';
  }
  if (xp >= 300) {
    badgeContainer.innerHTML += '<span class="badge">🌟 Mental Commander</span>';
  }
}

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return;

  const taskList = document.getElementById('taskList');
  const taskDiv = document.createElement('div');
  taskDiv.textContent = task;
  taskDiv.classList.add('task-item');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.onclick = () => {
    taskList.removeChild(taskDiv);
    gainXP(5);
  };

  taskDiv.appendChild(deleteBtn);
  taskList.appendChild(taskDiv);
  input.value = '';
}

window.onload = function () {
  const savedPersona = localStorage.getItem('persona');
  if (savedPersona) {
    switchPersona(savedPersona);
  }
  updateLevel();
  updateBadges();
};
function giveSolution(feeling) {
  const solutionBox = document.getElementById('solutionOutput');
  let solution = '';

  switch (feeling) {
    case 'devastated':
      solution = "Take a deep breath. Switch to the Healer persona, play calm music, and try a 5-minute body scan meditation. You’re not alone.";
      switchPersona('heal');
      break;
    case 'anxious':
      solution = "Try grounding: name 5 things you can see, 4 you can touch, 3 you can hear. Switch to Healer and schedule a 10-min break.";
      switchPersona('heal');
      break;
    case 'burned out':
      solution = "You’ve likely been pushing too hard. Switch to Dreamer mode, and journal freely or take a mindful walk. Reset is strength.";
      switchPersona('dream');
      break;
    case 'unfocused':
      solution = "Switch to Commander. Use the Intrusive Thought Manager to unload distractions, then do a 10-minute focus sprint.";
      switchPersona('focus');
      break;
    case 'sad':
      solution = "Let yourself feel it. Switch to Healer. Put on soothing music or write a compassionate letter to yourself.";
      switchPersona('heal');
      break;
    case 'angry':
      solution = "Redirect energy—try a physical reset like a quick workout or cold splash. Switch to Commander and write out the trigger.";
      switchPersona('focus');
      break;
    default:
      solution = "";
  }

  solutionBox.textContent = solution;
  if (solution) gainXP(7);
}

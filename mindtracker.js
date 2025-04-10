
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

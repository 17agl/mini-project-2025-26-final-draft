// script.js

// =================== Utility Functions ===================

// Load data from localStorage or initialize
function getData(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

// Save data to localStorage
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// =================== Navigation & Logout ===================

function logout() {
  alert("Logging out...");
  localStorage.clear();
  window.location.href = "index.html"; // Redirect to login/home
}

// =================== Goals Management ===================

let userGoals = getData('userGoals', []);

// Render goals in goals list
function renderGoals() {
  const ul = document.getElementById('goalsUl');
  if (!ul) return;
  ul.innerHTML = '';
  userGoals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${goal.title || 'Untitled'}</strong><br/>
      ${goal.description || ''}
      <br/>Measurable: ${goal.measurable || ''}
      <br/>Achievable: ${goal.achievable || ''}
      <br/>Relevant: ${goal.relevant || ''}
      <br/>Deadline: ${goal.deadline || ''}
    `;
    ul.appendChild(li);
  });
}

// Add a new goal
function addGoal() {
  const title = document.getElementById('goalTitle').value.trim();
  const description = document.getElementById('goalDescription').value.trim();
  const measurable = document.getElementById('goalMeasurable').value.trim();
  const achievable = document.getElementById('goalAchievable').value.trim();
  const relevant = document.getElementById('goalRelevant').value.trim();
  const deadline = document.getElementById('goalTimeBound').value;

  if (title && measurable && achievable && relevant && deadline) {
    userGoals.push({ title, description, measurable, achievable, relevant, deadline });
    setData('userGoals', userGoals);
    renderGoals();

    // Reset inputs
    document.getElementById('goalTitle').value = '';
    document.getElementById('goalDescription').value = '';
    document.getElementById('goalMeasurable').value = '';
    document.getElementById('goalAchievable').value = '';
    document.getElementById('goalRelevant').value = '';
    document.getElementById('goalTimeBound').value = '';
  } else {
    alert('Please fill all required fields.');
  }
}

// =================== Challenges Acceptance ===================

function acceptChallenge(challengeName) {
  alert(`Challenge "${challengeName}" accepted!`);
  // Example: add challenge as goal
  userGoals.push({ title: challengeName, description: 'Challenge accepted', measurable: '', achievable: '', relevant: '', deadline: '' });
  setData('userGoals', userGoals);
  renderGoals();
}

// =================== Initialize on Load ===================

window.onload = () => {
  // Render goals if on goals page
  if (document.getElementById('goalsUl')) {
    renderGoals();
  }
  // Load progress data, charts, etc., as needed
};

// =================== Additional Features ===================

// Add more functions as needed for progress, motivation, savings, etc.
// ==========================
// Initialize functions
// ==========================
window.onload = () => {
  loadGoals();
  // Load user data if available
  if (userData.name) {
    document.querySelector('#profileDetails')?.innerHTML = `
      <img src="${userData.profilePhoto || 'https://via.placeholder.com/150'}" class="profile-img"/>
      <p>Name: ${userData.name}</p>
      <p>Email: ${userData.email}</p>
      <p>Age: ${userData.age || 'N/A'}</p>
      <p>Gender: ${userData.gender || 'N/A'}</p>
    `;
  }
  // Generate charts if needed
  generateProgressCharts();
};

// ==========================
// Chart.js Chart Generators
// ==========================
function generateProgressCharts() {
  // Example progress doughnut
  if (document.getElementById('progressChart')) {
    new Chart(document.getElementById('progressChart'), {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
          data: [65, 35],
          backgroundColor: ['#4caf50', '#e0e0e0']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }
  // Mood line chart
  if (document.getElementById('moodChart')) {
    new Chart(document.getElementById('moodChart'), {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Mood',
          data: [4, 5, 4, 3, 4, 5, 4],
          fill: false,
          borderColor: '#2196f3',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { min: 1, max: 10 }
        }
      }
    });
  }
}

// ==========================
// Additional functions
// ==========================
function updateSavingsDisplay() {
  const savings = parseFloat(localStorage.getItem('savings')) || 0;
  document.getElementById('savingsDisplay')?.innerText = `Total Savings: ₹${savings}`;
}

function addSavings() {
  const amountStr = prompt('Enter amount to add to savings:', '0');
  const amount = parseFloat(amountStr);
  if (!isNaN(amount) && amount > 0) {
    let total = parseFloat(localStorage.getItem('savings')) || 0;
    total += amount;
    localStorage.setItem('savings', total);
    updateSavingsDisplay();
  } else {
    alert('Invalid amount.');
  }
}

// ==========================
// Profile functions
// ==========================
function loadProfile() {
  // Load profile info
  // Implemented in profile page script
}
function editProfile() {
  // Implemented in profile page script
}
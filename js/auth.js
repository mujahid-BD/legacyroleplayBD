// Handle Login Form Submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const userid = document.getElementById('userid').value.trim();

    if (!username || !userid) {
      alert('Please enter both username and user ID.');
      return;
    }

    const userData = {
      username,
      userid,
      role: 'pending', // default role
      approved: false
    };

    localStorage.setItem('legacyRPUser', JSON.stringify(userData));

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  });
}

// Auto redirect to dashboard if already logged in and on login page
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('legacyRPUser'));
  const currentPage = window.location.pathname;

  if (user && user.username && currentPage.includes('login.html')) {
    window.location.href = 'dashboard.html';
  }
});

// Render user header content (Login / Logout display)
function renderUserHeader() {
  const userDiv = document.getElementById('user-controls');
  if (!userDiv) return;

  const user = JSON.parse(localStorage.getItem('legacyRPUser'));

  if (user && user.username) {
    userDiv.innerHTML = `
      Logged in as <strong>${user.username}</strong>
      <button onclick="logoutUser()" style="margin-left: 10px; padding: 5px 10px;">Logout</button>
    `;
  } else {
    userDiv.innerHTML = `
      <a href="login.html" style="color: white; text-decoration: underline;">Login</a>
    `;
  }
}

// Logout function
function logoutUser() {
  localStorage.removeItem('legacyRPUser');
  window.location.href = 'index.html';
}

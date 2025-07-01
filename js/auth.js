// auth.js

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
      role: 'pending',
      approved: false,
    };

    localStorage.setItem('legacyRPUser', JSON.stringify(userData));

    // Redirect after login
    window.location.href = 'dashboard.html';
  });
}

// ================================
// Header user control renderer
// ================================
function renderUserHeader() {
  const userControls = document.getElementById('user-controls');
  const user = JSON.parse(localStorage.getItem('legacyRPUser'));

  if (!userControls) return;

  if (!user) {
    userControls.innerHTML = `<button onclick="window.location.href='login.html'" style="padding: 8px 16px; background:#7289da; color:white; border:none; border-radius:5px; cursor:pointer;">Login</button>`;
  } else {
    userControls.innerHTML = `
      <span style="margin-right: 10px;">👤 ${user.username}</span>
      <button onclick="logoutUser()" style="padding: 8px 16px; background:#e74c3c; color:white; border:none; border-radius:5px; cursor:pointer;">Logout</button>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem('legacyRPUser');
  window.location.reload();
}

// ================================
// Call render when DOM loaded
// ================================
window.addEventListener('DOMContentLoaded', renderUserHeader);

// auth.js

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const userid = document.getElementById('userid').value.trim();

  if (!username || !userid) {
    alert('Please enter both username and user ID.');
    return;
  }

  // Save user data in localStorage (simulate login + registration)
  const userData = {
    username,
    userid,
    role: 'pending', // default role on registration
    approved: false,
  };

  localStorage.setItem('legacyRPUser', JSON.stringify(userData));

  // Redirect to dashboard after login
  window.location.href = 'dashboard.html';
});

// If already logged in, redirect to dashboard
window.onload = () => {
  const existingUser = localStorage.getItem('legacyRPUser');
  if (existingUser) {
    window.location.href = 'dashboard.html';
  }
};

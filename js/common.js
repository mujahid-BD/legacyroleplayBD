// common.js

function loadHeaderFooter() {
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;
      attachHeaderEvents();
    });

  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    });
}

function attachHeaderEvents() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('legacyRPUser');
      window.location.href = 'index.html';
    });
  }
}

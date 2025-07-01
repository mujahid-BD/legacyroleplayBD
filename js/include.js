// js/include.js

window.addEventListener('DOMContentLoaded', () => {
  const headerTarget = document.getElementById('header');
  const footerTarget = document.getElementById('footer');

  if (headerTarget) {
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        headerTarget.innerHTML = data;
      });
  }

  if (footerTarget) {
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        footerTarget.innerHTML = data;
      });
  }
});

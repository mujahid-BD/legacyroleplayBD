document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('legacyRPUser'));
  const section = document.getElementById('request-section');

  if (!user || !user.approved || user.role !== 'company_owner') {
    section.innerHTML = `<p style="color:red;">Only approved company owners can request a block.</p>`;
    return;
  }

  // Fetch blocks and load form
  fetch('blocks.json')
    .then(res => res.json())
    .then(blocks => {
      const availableBlocks = blocks.filter(b => b.isAvailable);

      if (availableBlocks.length === 0) {
        section.innerHTML = '<p>No blocks available for rent at the moment.</p>';
        return;
      }

      const formHTML = `
        <form id="rentForm">
          <label for="block">Select a Block:</label><br />
          <select id="block" required>
            ${availableBlocks.map(b => `<option value="${b.id}">${b.name}</option>`).join('')}
          </select><br /><br />
          <label for="reason">Why do you want this block?</label><br />
          <textarea id="reason" required></textarea><br /><br />
          <button type="submit">Submit Request</button>
        </form>
        <p id="message" style="color:green; margin-top: 1rem;"></p>
      `;

      section.innerHTML = formHTML;

      document.getElementById('rentForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const blockId = document.getElementById('block').value;
        const reason = document.getElementById('reason').value.trim();

        const request = {
          blockId,
          reason,
          username: user.username,
          userid: user.userid,
          timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem('blockRequests') || '[]');
        existing.push(request);
        localStorage.setItem('blockRequests', JSON.stringify(existing));

        document.getElementById('message').textContent = 'Request submitted successfully!';
        document.getElementById('rentForm').reset();
      });
    });
});

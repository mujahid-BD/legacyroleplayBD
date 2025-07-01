// admin.js

// Authorization: Check if user is admin
const user = JSON.parse(localStorage.getItem('legacyRPUser'));
if (!user || user.role !== 'admin') {
  alert('Access denied. Admins only.');
  window.location.href = 'index.html';
}

// Load blocks and requests
const requestsContainer = document.getElementById('requests-container');
let blocks = [];
let requests = JSON.parse(localStorage.getItem('blockRequests')) || [];

async function loadBlocks() {
  const res = await fetch('data/blocks.json');
  blocks = await res.json();
  renderRequests();
}

function renderRequests() {
  if (requests.length === 0) {
    requestsContainer.innerHTML = '<p>No pending requests.</p>';
    return;
  }

  requestsContainer.innerHTML = '';

  requests.forEach((req, index) => {
    const block = blocks.find(b => b.id === req.blockId);
    if (!block) return;

    const card = document.createElement('div');
    card.className = 'request-card';
    card.innerHTML = `
      <h3>${block.name}</h3>
      <p><strong>Company:</strong> ${req.company}</p>
      <p><strong>Requested by:</strong> ${req.username}</p>
      <button onclick="approveRequest(${index})">Approve</button>
      <button onclick="rejectRequest(${index})" style="background:red;">Reject</button>
    `;

    requestsContainer.appendChild(card);
  });
}

function approveRequest(index) {
  const req = requests[index];
  const blockIndex = blocks.findIndex(b => b.id === req.blockId);
  if (blockIndex === -1) return;

  // Update block availability and assign to company
  blocks[blockIndex].isAvailable = false;
  blocks[blockIndex].assignedTo = req.company;

  // Save updated blocks
  saveBlocks(blocks);

  // Remove the request
  requests.splice(index, 1);
  localStorage.setItem('blockRequests', JSON.stringify(requests));

  renderRequests();
  alert('Request approved!');
}

function rejectRequest(index) {
  requests.splice(index, 1);
  localStorage.setItem('blockRequests', JSON.stringify(requests));
  renderRequests();
  alert('Request rejected!');
}

// Save to blocks.json-like storage
function saveBlocks(updatedBlocks) {
  localStorage.setItem('blocksDataOverride', JSON.stringify(updatedBlocks));
}

// Optional: Allow admin to reset override
window.resetBlockOverrides = function () {
  localStorage.removeItem('blocksDataOverride');
  alert('Block data reset to original.');
  location.reload();
};

loadBlocks();

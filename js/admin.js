// admin.js

// Header/Footer লোড করা
window.onload = () => {
  loadHeaderFooter();

  // ইউজার ভেরিফাই করা - শুধুমাত্র অ্যাডমিন
  const userStr = localStorage.getItem('legacyRPUser');
  if (!userStr) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }
  const user = JSON.parse(userStr);
  if (user.role !== 'admin') {
    alert('Access denied: Admin only');
    window.location.href = 'index.html';
    return;
  }

  loadRequests();
};

function loadRequests() {
  const requestsStr = localStorage.getItem('blockRentRequests');
  const requests = requestsStr ? JSON.parse(requestsStr) : [];

  const container = document.getElementById('request-list');
  container.innerHTML = '';

  if (requests.length === 0) {
    container.innerHTML = '<p>No pending requests.</p>';
    return;
  }

  requests.forEach((req, idx) => {
    if (req.status === 'pending') {
      const div = document.createElement('div');
      div.classList.add('request-item');
      div.innerHTML = `
        <p><strong>Request ID:</strong> ${req.requestId}</p>
        <p><strong>User:</strong> ${req.username} (${req.userid})</p>
        <p><strong>Company:</strong> ${req.companyName}</p>
        <p><strong>Block:</strong> ${req.blockName}</p>
        <button onclick="approveRequest(${idx})">Approve</button>
        <button onclick="rejectRequest(${idx})">Reject</button>
        <hr/>
      `;
      container.appendChild(div);
    }
  });
}

function approveRequest(index) {
  const requestsStr = localStorage.getItem('blockRentRequests');
  let requests = requestsStr ? JSON.parse(requestsStr) : [];

  requests[index].status = 'approved';

  // Block এর isAvailable false করে এবং companyName সেট করা (blocks.json এর ডাটা localStorage এ হলে আপডেট করতে হবে)
  updateBlockAvailability(requests[index].blockId, requests[index].companyName, false);

  localStorage.setItem('blockRentRequests', JSON.stringify(requests));
  alert('Request approved.');
  loadRequests();
}

function rejectRequest(index) {
  const requestsStr = localStorage.getItem('blockRentRequests');
  let requests = requestsStr ? JSON.parse(requestsStr) : [];

  requests[index].status = 'rejected';

  localStorage.setItem('blockRentRequests', JSON.stringify(requests));
  alert('Request rejected.');
  loadRequests();
}

// ব্লক অবস্থা আপডেট করার ফাংশন (localStorage এ blocks.json ডাটা কপি ধরে রাখলে)
function updateBlockAvailability(blockId, companyName, availability) {
  const blocksStr = localStorage.getItem('blocksData');
  if (!blocksStr) return;

  let blocks = JSON.parse(blocksStr);

  blocks = blocks.map(block => {
    if (block.id === blockId) {
      block.isAvailable = availability;
      if (!availability) {
        block.rentedBy = companyName;
      } else {
        delete block.rentedBy;
      }
    }
    return block;
  });

  localStorage.setItem('blocksData', JSON.stringify(blocks));
}

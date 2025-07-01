async function getBlockIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function loadBlockDetails() {
  const blockId = await getBlockIdFromURL();
  if (!blockId) {
    alert('No block selected!');
    return;
  }

  try {
    const res = await fetch('blocks.json');
    if (!res.ok) throw new Error('Failed to load blocks.json');
    const blocks = await res.json();

    const block = blocks.find(b => b.id === blockId);
    if (!block) {
      alert('Block not found!');
      return;
    }

    document.getElementById('blockName').textContent = block.name;
    document.getElementById('blockImage').src = block.image;
    document.getElementById('blockImage').alt = block.name;

    document.getElementById('numHouses').textContent = block.houses;

    const tbody = document.getElementById('houseTypesTableBody');
    tbody.innerHTML = '';
    for (const [type, count] of Object.entries(block.types)) {
      const storage = block.storage[type] || '-';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${type}</td>
        <td>${count}</td>
        <td>${storage}</td>
      `;
      tbody.appendChild(tr);
    }

    const statusEl = document.getElementById('availabilityStatus');
    if (block.isAvailable) {
      statusEl.textContent = 'Available for rent';
      statusEl.style.color = 'green';
      document.getElementById('bookingSection').style.display = 'block';
    } else {
      statusEl.textContent = 'Not Available';
      statusEl.style.color = 'red';
      document.getElementById('bookingSection').style.display = 'none';
    }

  } catch (error) {
    console.error('Error loading block details:', error);
    alert('Error loading block details');
  }
}

function validateCompanyOwner(companyName, companyEmail) {
  // এখানে পরবর্তীতে API বা অন্য কোনো চেকিং যুক্ত করো
  // এখন শুধু একটি সিম্পল চেক (নাল বা ছোট স্ট্রিং নয়) করা হচ্ছে

  if (!companyName.trim() || !companyEmail.trim()) {
    return false;
  }
  // ইমেইল ফর্ম্যাট সাধারণভাবে চেক
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(companyEmail);
}

function handleBookingForm() {
  const form = document.getElementById('bookingForm');
  const message = document.getElementById('bookingMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const companyName = form.companyName.value.trim();
    const companyEmail = form.companyEmail.value.trim();

    if (!validateCompanyOwner(companyName, companyEmail)) {
      message.style.color = 'red';
      message.textContent = 'সঠিক কোম্পানি নাম এবং ইমেইল দিন।';
      return;
    }

    // TODO: API কল দিয়ে বুকিং রিকোয়েস্ট পাঠানো হবে (বর্তমানে শুধু মেসেজ দেখানো)
    message.style.color = 'green';
    message.textContent = 'আপনার বুকিং রিকোয়েস্ট সফলভাবে পাঠানো হয়েছে! (ডেমো)';

    form.reset();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadBlockDetails();
  handleBookingForm();
};

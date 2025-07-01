async function loadBlocks() {
  try {
    const res = await fetch('blocks.json');
    if (!res.ok) throw new Error('Failed to load blocks.json');
    const blocks = await res.json();

    const blockList = document.getElementById('blockList');
    blockList.innerHTML = '';

    blocks.forEach(block => {
      const card = document.createElement('div');
      card.className = 'block-card';

      card.innerHTML = `
        <img src="${block.image}" alt="${block.name}" />
        <div class="block-info">
          <div class="block-name">${block.name}</div>
          <div>Houses: ${block.houses}</div>
          <div class="${block.isAvailable ? 'availability' : 'not-available'}">
            ${block.isAvailable ? 'Available for rent' : 'Not Available'}
          </div>
        </div>
      `;

      card.onclick = () => {
        // ব্লক এর বিস্তারিত পেজে নিয়ে যাবে, id query param সহ
        window.location.href = `block.html?id=${encodeURIComponent(block.id)}`;
      };

      blockList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading blocks:', error);
    document.getElementById('blockList').innerHTML = '<p>ব্লক লিস্ট লোড করতে সমস্যা হয়েছে।</p>';
  }
}

loadBlocks();

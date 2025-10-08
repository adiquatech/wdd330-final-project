// src/js/growth.js
import { initializeUI } from './dashBoard.mjs';
import { growthModule } from './growthModule.mjs';

async function loadPartials() {
  try {
    const [sidebarHtml, headerHtml, footerHtml] = await Promise.all([
      fetch('../partials/sidebar.html').then(res => res.text()),
      fetch('../partials/header.html').then(res => res.text()),
      fetch('../partials/footer.html').then(res => res.text())
    ]);
    document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
    document.getElementById('headerContainer').innerHTML = headerHtml;
    document.getElementById('footerContainer').innerHTML = footerHtml;
    console.log('Partials loaded successfully at 10:50 AM WAT on October 08, 2025');
    initializeUI();
  } catch (error) {
    console.error('Failed to load partials at 10:50 AM WAT on October 08, 2025:', error);
    document.getElementById('sidebarContainer').innerHTML = '<div class="sidebar">Sidebar loading failed</div>';
    document.getElementById('headerContainer').innerHTML = '<header>Header loading failed</header>';
    document.getElementById('footerContainer').innerHTML = '<footer>Footer loading failed</footer>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();

  const form = document.getElementById('trackGrowthForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        growthWeight: document.getElementById('weight').value
      };
      if (growthModule && growthModule.trackGrowth) {
        growthModule.trackGrowth(formData);
      } else {
        console.error('growthModule or trackGrowth not available at 10:50 AM WAT on October 08, 2025');
      }
    });
  } else {
    console.error('Form not found at 10:50 AM WAT on October 08, 2025');
  }
});
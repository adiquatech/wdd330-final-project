// src/js/main.js
import { initializeUI, loadDashboardData } from './dashBoard.mjs';
import { feedModule } from './feedModule.mjs';
// import { growthModule } from './growthModule.mjs' (commented out)

async function loadPartials() {
  try {
    const [sidebarHtml, headerHtml, footerHtml] = await Promise.all([
      fetch('partials/sidebar.html').then(res => res.text()),
      fetch('partials/header.html').then(res => res.text()),
      fetch('partials/footer.html').then(res => res.text())
    ]);
    document.getElementById('sidebarContainer').innerHTML = sidebarHtml;
    document.getElementById('headerContainer').innerHTML = headerHtml;
    document.getElementById('footerContainer').innerHTML = footerHtml;
    console.log('Partials loaded successfully');
    initializeUI(); // Call after partials load
    loadDashboardData();
  } catch (error) {
    console.error('Failed to load partials:', error);
    document.getElementById('sidebarContainer').innerHTML = '<div class="sidebar">Sidebar loading failed</div>';
    document.getElementById('headerContainer').innerHTML = '<header>Header loading failed</header>';
    document.getElementById('footerContainer').innerHTML = '<footer>Footer loading failed</footer>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials();

  const form = document.getElementById('addDataForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        eggsToday: document.getElementById('eggs').value,
        feedConsumed: document.getElementById('feed').value,
        growthWeight: document.getElementById('weight').value
      };
      if (feedModule && feedModule.addFeedLog) {
        feedModule.addFeedLog(formData);
        loadDashboardData();
      } else {
        console.error('feedModule or addFeedLog not available');
      }
    });
  } else {
    console.error('Form not found');
  }
});


// loadDashboardData function
export async function loadDashboardData() {
  const apiData = await feedModule.fetchEggProduction();
  const localData = feedModule.getFeedLogs();
  const combinedData = [...localData, { ...apiData, type: 'api-eggs', date: new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Lagos' }) }];
  
  const summaryCards = document.getElementById('summaryCards');
  if (summaryCards) {
    summaryCards.innerHTML = combinedData.map(item => `
      <div class="card">
        <h3>${item.type.toUpperCase()}</h3>
        <p>Eggs Today: ${item.eggsToday || 'N/A'}</p>
        <p>Feed: ${item.feedConsumed || 'N/A'}kg</p>
        <p>Avg Weight: ${item.growthWeight || 'N/A'}kg</p>
        <p>Date: ${item.date}</p>
        ${item.type === 'api-eggs' ? `<small>(USDA API: ${item.source})</small>` : ''}
      </div>
    `).join('');
  } else {
    console.error('Summary cards element not found');
  }
}

// Modify DOMContentLoaded to handle async
document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  await loadDashboardData();
  const form = document.getElementById('addDataForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        count: document.getElementById('count').value,
        eggsToday: document.getElementById('eggs').value,
        feedConsumed: document.getElementById('feed').value,
        growthWeight: document.getElementById('weight').value
      };
      if (feedModule && feedModule.addFeedLog) {
        feedModule.addFeedLog(formData);
        loadDashboardData();
      } else {
        console.error('feedModule or addFeedLog not available');
      }
    });
  } else {
    console.error('Form not found');
  }
});
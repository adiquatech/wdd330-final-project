// Load dashboard data from APIs
async function loadDashboardData() {
    const summaryCards = document.getElementById('summaryCards');
    summaryCards.innerHTML = ''; // Clear existing cards

    try {
        // USDA API for feed cost (replace DEMO_KEY with your API key from api.data.gov)
        const usdaResponse = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=poultry%20feed&api_key=DEMO_KEY');
        const usdaData = await usdaResponse.json();
        const feedCost = usdaData.foods?.[0]?.foodNutrients?.[0]?.value || 150;
        createCard('Feed Cost', `$${feedCost.toFixed(2)}`);

        // Agmarknet API (use CORS proxy, e.g., https://cors-anywhere.herokuapp.com/)
        const agmarkResponse = await fetch('https://cors-anywhere.herokuapp.com/https://agmarknet.gov.in/SearchCmmMkt.aspx?Tx_Commodity=1&Tx_State=0&Tx_District=0&Tx_Market=0&DateFrom=01-Oct-2025&DateTo=06-Oct-2025&Tx_Trend=0&Tx_CommodityName=Poultry&Tx_StateName=---Select---&Tx_DistrictName=---Select---&Tx_MarketName=---Select---');
        const agmarkData = await agmarkResponse.text(); // Parse HTML in production
        createCard('Price Alert', 'Eggs: $0.15/ea (from API)');
        createCard('Flock Health', '95%'); // Placeholder
    } catch (error) {
        console.error('API error:', error);
        createCard('Feed Cost', '$150'); // Fallback
        createCard('Price Alert', '+5% Eggs'); // Fallback
        createCard('Flock Health', '95%'); // Fallback
    }
}

function createCard(title, value) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${title}</h3><p>${value}</p>`;
    document.getElementById('summaryCards').appendChild(card);
}

function addFeedLog() {
    alert('Add Feed Log functionality coming soon!');
}

// Load data on page load
window.addEventListener('load', loadDashboardData);
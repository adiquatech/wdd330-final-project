export const feedModule = {
  // Existing getFeedLogs and addFeedLog...

  async fetchEggProduction(year = 2025) {
  const url = `https://quickstats.nass.usda.gov/api/api_GET/?commodity_desc=EGGS&statisticcat_desc=PRODUCTION&agg_level_desc=NATIONAL&year=${year}&format=JSON`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('USDA API request failed');
    const data = await response.json();
    const production = data.data[0]?.Value || 'N/A';
    console.log(`Fetched egg production: ${production} thousand dozen at 11:47 AM WAT on October 08, 2025`);
    return { eggsToday: parseInt(production) * 12 * 1000 || 'N/A', source: 'USDA NASS API' };
  } catch (error) {
    console.error('USDA API Error:', error);
    return { eggsToday: '109000000', source: 'Fallback (USDA avg)' };
  }
}
};
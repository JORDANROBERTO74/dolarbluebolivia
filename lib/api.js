/**
 * API layer for fetching quote and historical data
 * In production, these would connect to real APIs
 */

/**
 * Fetches the latest exchange rate quote
 * @returns {Promise<{buy: number, sell: number, updatedAt: string}>}
 */
export async function getLatestQuote() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // In development, fetch from mock data
    const response = await fetch("/mock/quote.json");
    const data = await response.json();
    
    // Add small random variation to simulate live data
    const variation = (Math.random() - 0.5) * 0.02;
    return {
      buy: parseFloat((data.buy + variation).toFixed(2)),
      sell: parseFloat((data.sell + variation).toFixed(2)),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    // Return fallback data
    return {
      buy: 7.02,
      sell: 7.10,
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Generates historical price data for charts
 * @param {string} range - Time range: '24h', '7d', '30d'
 * @param {string} interval - Data interval: '15m', '1h', '4h', '1d'
 * @returns {Promise<Array<{timestamp: string, value: number}>>}
 */
export async function getHistoricalData(range = "24h", interval = "1h") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const now = Date.now();
  const dataPoints = [];
  let intervalMs, totalPoints;

  // Determine interval in milliseconds and number of points
  switch (interval) {
    case "15m":
      intervalMs = 15 * 60 * 1000;
      break;
    case "1h":
      intervalMs = 60 * 60 * 1000;
      break;
    case "4h":
      intervalMs = 4 * 60 * 60 * 1000;
      break;
    case "1d":
      intervalMs = 24 * 60 * 60 * 1000;
      break;
    default:
      intervalMs = 60 * 60 * 1000;
  }

  // Determine total points based on range
  switch (range) {
    case "24h":
      totalPoints = Math.floor((24 * 60 * 60 * 1000) / intervalMs);
      break;
    case "7d":
      totalPoints = Math.floor((7 * 24 * 60 * 60 * 1000) / intervalMs);
      break;
    case "30d":
      totalPoints = Math.floor((30 * 24 * 60 * 60 * 1000) / intervalMs);
      break;
    default:
      totalPoints = 24;
  }

  // Generate simulated historical data with realistic price movements
  const basePrice = 7.06;
  let currentPrice = basePrice;

  for (let i = totalPoints; i >= 0; i--) {
    const timestamp = new Date(now - i * intervalMs).toISOString();
    
    // Add some random walk variation
    const change = (Math.random() - 0.5) * 0.05;
    currentPrice = Math.max(6.8, Math.min(7.3, currentPrice + change));
    
    dataPoints.push({
      timestamp,
      value: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return dataPoints;
}

/**
 * Converts currency amount between BOB and USD
 * @param {number} amount - Amount to convert
 * @param {string} from - Source currency (BOB or USD)
 * @param {string} to - Target currency (BOB or USD)
 * @param {number} rate - Exchange rate
 * @returns {number} Converted amount
 */
export function convertCurrency(amount, from, to, rate) {
  if (from === to) return amount;
  
  if (from === "USD" && to === "BOB") {
    return amount * rate;
  } else if (from === "BOB" && to === "USD") {
    return amount / rate;
  }
  
  return amount;
}


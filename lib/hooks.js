import { useState, useEffect, useCallback } from "react";
import { getLatestQuote, getHistoricalData } from "./api";

/**
 * Hook to poll for latest quote data at specified interval
 * @param {number} interval - Polling interval in milliseconds (default: 30000)
 * @returns {{quote: object|null, loading: boolean, error: Error|null}}
 */
export function useQuotePolling(interval = 30000) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLatestQuote();
      setQuote(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching quote:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchQuote();

    // Set up polling interval
    const intervalId = setInterval(fetchQuote, interval);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [fetchQuote, interval]);

  return { quote, loading, error };
}

/**
 * Hook to fetch historical data for charts
 * @param {string} range - Time range: '24h', '7d', '30d'
 * @param {string} interval - Data interval: '15m', '1h', '4h', '1d'
 * @returns {{data: Array, loading: boolean, error: Error|null, refetch: Function}}
 */
export function useHistoricalData(range = "24h", interval = "1h") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const historicalData = await getHistoricalData(range, interval);
      setData(historicalData);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching historical data:", err);
    } finally {
      setLoading(false);
    }
  }, [range, interval]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}


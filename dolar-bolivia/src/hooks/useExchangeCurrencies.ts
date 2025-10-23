import { useState, useEffect, useCallback } from "react";

export interface CurrencyRate {
  buy: number;
  sell: number;
}

export interface ExchangeCurrenciesData {
  success: boolean;
  data: {
    Euro: CurrencyRate;
    "Libra Esterlina": CurrencyRate;
    "Peso Argentino": CurrencyRate;
    "Peso Chileno": CurrencyRate;
    "Real Brasileño": CurrencyRate;
    "Sol Peruano": CurrencyRate;
    "Yuan Chino": CurrencyRate;
    blue: CurrencyRate;
    official: CurrencyRate;
  } | null;
  lastUpdate: string;
  timestamp: number;
  source: string;
  error?: string;
}

export function useExchangeCurrencies(autoRefresh = true, interval = 60000) {
  const [data, setData] = useState<ExchangeCurrenciesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRates = useCallback(async () => {
    try {
      const response = await fetch("/api/exchange-currencies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ExchangeCurrenciesData = await response.json();

      if (result.success) {
        setData(result);
        setError(null);
      } else {
        throw new Error(result.error || "Error fetching exchange rates");
      }
    } catch (err) {
      console.error("Error fetching exchange currencies:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchExchangeRates();

    // Set up auto-refresh if enabled
    if (autoRefresh) {
      const intervalId = setInterval(fetchExchangeRates, interval);
      return () => clearInterval(intervalId);
    }
  }, [fetchExchangeRates, autoRefresh, interval]);

  return {
    data,
    loading,
    error,
    refetch: fetchExchangeRates,
  };
}

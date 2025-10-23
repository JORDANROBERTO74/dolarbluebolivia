import { useState, useEffect, useCallback, useRef } from "react";

interface P2PPriceResponse {
  buyPrice: number;
  sellPrice: number;
  lastUpdate: string;
  timestamp: number;
  success: boolean;
  error?: string;
  // Additional market data
  buyAnnouncementsCount?: number;
  sellAnnouncementsCount?: number;
  buyPriceRange?: {
    min: number;
    max: number;
  };
  sellPriceRange?: {
    min: number;
    max: number;
  };
}

interface P2PPriceState {
  buyPrice: number;
  sellPrice: number;
  lastUpdate: string;
  isLoading: boolean;
  error: string | null;
}

export const useP2PPrice = (autoRefresh = true, interval = 60000) => {
  const [priceState, setPriceState] = useState<P2PPriceState>({
    buyPrice: 0,
    sellPrice: 0,
    lastUpdate: "",
    isLoading: true,
    error: null,
  });

  const retryCount = useRef(0);
  const maxRetries = 3;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getP2PPrice = useCallback(async (): Promise<P2PPriceResponse> => {
    setPriceState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/p2p-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Error desconocido");
      }

      // Reset retry count on success
      retryCount.current = 0;

      // Update state with new data
      setPriceState({
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        lastUpdate: data.lastUpdate,
        isLoading: false,
        error: null,
      });

      return {
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        lastUpdate: data.lastUpdate,
        timestamp: data.timestamp,
        success: true,
      };
    } catch (error) {
      console.error("Error obteniendo precio P2P:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      setPriceState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      // Retry logic
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        setTimeout(() => {
          getP2PPrice();
        }, 1000 * retryCount.current);
      }

      return {
        buyPrice: 0,
        sellPrice: 0,
        lastUpdate: "",
        timestamp: 0,
        success: false,
        error: errorMessage,
      };
    }
  }, []);

  // Auto-refresh with configurable interval
  useEffect(() => {
    // Initial fetch
    getP2PPrice();

    // Set up interval only if autoRefresh is enabled
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        getP2PPrice();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getP2PPrice, autoRefresh, interval]);

  // Manual refresh function
  const refreshPrices = useCallback(() => {
    retryCount.current = 0; // Reset retry count for manual refresh
    return getP2PPrice();
  }, [getP2PPrice]);

  return {
    ...priceState,
    refreshPrices,
    getP2PPrice,
  };
};

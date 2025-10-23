import { NextRequest, NextResponse } from "next/server";

interface BinanceP2PResponse {
  data: Array<{
    adv: {
      price: string;
      tradeType: "BUY" | "SELL";
    };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // Fetch buy prices (USDT -> BOB)
    const buyResponse = await fetch(
      "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: "USDT",
          fiat: "BOB",
          tradeType: "BUY",
          page: 2,
          rows: 10,
          payTypes: [],
        }),
      }
    );

    // Fetch sell prices (USDT -> BOB)
    const sellResponse = await fetch(
      "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: "USDT",
          fiat: "BOB",
          tradeType: "SELL",
          page: 2,
          rows: 5,
          payTypes: [],
        }),
      }
    );

    const buyData: BinanceP2PResponse = await buyResponse.json();
    const sellData: BinanceP2PResponse = await sellResponse.json();

    if (
      buyData.data &&
      sellData.data &&
      buyData.data.length > 0 &&
      sellData.data.length > 0
    ) {
      // Calculate average buy price from all announcements
      const buyPrices = buyData.data.map((ad) => parseFloat(ad.adv.price));
      const averageBuyPrice =
        buyPrices.reduce((sum, price) => sum + price, 0) / buyPrices.length;

      // Calculate average sell price from all announcements
      const sellPrices = sellData.data.map((ad) => parseFloat(ad.adv.price));
      const averageSellPrice =
        sellPrices.reduce((sum, price) => sum + price, 0) / sellPrices.length;

      return NextResponse.json({
        success: true,
        buyPrice: averageBuyPrice,
        sellPrice: averageSellPrice,
        lastUpdate: new Date().toLocaleString("es-BO"),
        timestamp: Date.now(),
        // Additional info for transparency
        buyAnnouncementsCount: buyPrices.length,
        sellAnnouncementsCount: sellPrices.length,
        buyPriceRange: {
          min: Math.min(...buyPrices),
          max: Math.max(...buyPrices),
        },
        sellPriceRange: {
          min: Math.min(...sellPrices),
          max: Math.max(...sellPrices),
        },
      });
    } else {
      throw new Error("No se encontraron datos de precios P2P");
    }
  } catch (error) {
    console.error("Error fetching Binance P2P prices:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        buyPrice: 0,
        sellPrice: 0,
        lastUpdate: "",
      },
      { status: 500 }
    );
  }
}

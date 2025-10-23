import { NextRequest, NextResponse } from "next/server";

interface CurrencyRate {
  buy: number;
  sell: number;
}

interface ExchangeCurrenciesResponse {
  Euro: CurrencyRate;
  "Libra Esterlina": CurrencyRate;
  "Peso Argentino": CurrencyRate;
  "Peso Chileno": CurrencyRate;
  "Real Brasileño": CurrencyRate;
  "Sol Peruano": CurrencyRate;
  "Yuan Chino": CurrencyRate;
  blue: CurrencyRate;
  official: CurrencyRate;
}

export async function GET(request: NextRequest) {
  try {
    // Fetch exchange rates from external API
    const response = await fetch(
      "https://www.dolarbluebolivia.click/api/exchange_currencies",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable caching to get real-time data
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
    }

    const data: ExchangeCurrenciesResponse = await response.json();

    return NextResponse.json({
      success: true,
      data,
      lastUpdate: new Date().toLocaleString("es-BO", {
        timeZone: "America/La_Paz",
      }),
      timestamp: Date.now(),
      source: "dolarbluebolivia.click",
    });
  } catch (error) {
    console.error("Error fetching exchange currencies:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        data: null,
        lastUpdate: "",
      },
      { status: 500 }
    );
  }
}

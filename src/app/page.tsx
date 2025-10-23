"use client";

// Import all home components for Dólar Blue Bolivia
import { useEffect } from "react";
import MainQuoteSection from "@/components/home/MainQuoteSection";
import OtherCurrenciesSection from "@/components/home/OtherCurrenciesSection";
import CalculatorSection from "@/components/home/CalculatorSection";
import PlatformsSection from "@/components/home/PlatformsSection";
import { useExchangeCurrencies } from "@/hooks/useExchangeCurrencies";
import { useP2PPrice } from "@/hooks/useP2PPrice";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const {
    data: currencyData,
    loading,
    error,
  } = useExchangeCurrencies(true, 60000);
  const {
    buyPrice,
    sellPrice,
    lastUpdate,
    isLoading: p2pLoading,
    error: p2pError,
  } = useP2PPrice(true, 60000);

  // Handle errors with toasts
  useEffect(() => {
    if (error) {
      toast({
        title: "Error al cargar divisas",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (p2pError) {
      toast({
        title: "Error al cargar precio USD/BOB",
        description: p2pError,
        variant: "destructive",
      });
    }
  }, [p2pError, toast]);

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Main Quote Section */}
      <section id="inicio">
        <MainQuoteSection
          buyPrice={buyPrice}
          sellPrice={sellPrice}
          lastUpdate={lastUpdate}
          isLoading={p2pLoading}
          error={p2pError}
        />
      </section>

      {/* Other Currencies Section */}
      <section id="tipos-cambio">
        <OtherCurrenciesSection
          currencyData={currencyData}
          loading={loading}
          buyPrice={buyPrice}
          p2pLoading={p2pLoading}
        />
      </section>

      {/* Calculator Section */}
      <section id="calculadora">
        <CalculatorSection
          currencyData={currencyData}
          buyPrice={buyPrice}
          loading={loading}
          p2pLoading={p2pLoading}
        />
      </section>

      {/* Platforms Section */}
      <section id="p2p">
        <PlatformsSection />
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExchangeCurrenciesData } from "@/hooks/useExchangeCurrencies";
import { ArrowRight, ChartCandlestick } from "lucide-react";

interface CalculatorSectionProps {
  currencyData: ExchangeCurrenciesData | null;
  buyPrice: number;
  loading: boolean;
  p2pLoading: boolean;
}

export default function CalculatorSection({
  currencyData,
  buyPrice,
  loading,
  p2pLoading,
}: CalculatorSectionProps) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BOB");
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState("1264");
  const [conversionHistory, setConversionHistory] = useState<
    Array<{
      id: string;
      from: string;
      to: string;
      amount: number;
      result: number;
      rate: number;
      timestamp: Date;
    }>
  >([]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Currency mapping (memoized for performance)
  const currencies = useMemo(
    () => [
      { key: "USD", code: "USD", name: "Dólar Estadounidense", flag: "🇺🇸" },
      { key: "BOB", code: "BOB", name: "Boliviano", flag: "🇧🇴" },
      { key: "Euro", code: "EUR", name: "Euro", flag: "🇪🇺" },
      {
        key: "Libra Esterlina",
        code: "GBP",
        name: "Libra Esterlina",
        flag: "🇬🇧",
      },
      {
        key: "Peso Argentino",
        code: "ARS",
        name: "Peso Argentino",
        flag: "🇦🇷",
      },
      {
        key: "Real Brasileño",
        code: "BRL",
        name: "Real Brasileño",
        flag: "🇧🇷",
      },
      { key: "Sol Peruano", code: "PEN", name: "Sol Peruano", flag: "🇵🇪" },
      { key: "Yuan Chino", code: "CNY", name: "Yuan Chino", flag: "🇨🇳" },
      { key: "Peso Chileno", code: "CLP", name: "Peso Chileno", flag: "🇨🇱" },
    ],
    []
  );

  // Calculate conversion rate between currencies
  const calculateRate = useCallback(
    (from: string, to: string) => {
      if (!currencyData?.data || !buyPrice) return 0;

      // Same currency
      if (from === to) return 1;

      // USD to BOB
      if (from === "USD" && to === "BOB") return buyPrice;
      if (from === "BOB" && to === "USD") return 1 / buyPrice;

      // Other currencies to BOB
      if (to === "BOB") {
        if (from === "USD") return buyPrice;

        const currencyKey = currencies.find((c) => c.code === from)?.key;
        if (
          currencyKey &&
          currencyData.data[currencyKey as keyof typeof currencyData.data]
        ) {
          const currencyRate = currencyData.data[
            currencyKey as keyof typeof currencyData.data
          ] as { buy: number; sell: number };
          const avgCurrency = (currencyRate.buy + currencyRate.sell) / 2;

          if (currencyRate.buy < 10) {
            // Strong currencies (EUR, GBP)
            return (1 / avgCurrency) * buyPrice;
          } else {
            // Weak currencies (ARS, CLP)
            return buyPrice / avgCurrency;
          }
        }
      }

      // BOB to other currencies
      if (from === "BOB") {
        const currencyKey = currencies.find((c) => c.code === to)?.key;
        if (
          currencyKey &&
          currencyData.data[currencyKey as keyof typeof currencyData.data]
        ) {
          const currencyRate = currencyData.data[
            currencyKey as keyof typeof currencyData.data
          ] as { buy: number; sell: number };
          const avgCurrency = (currencyRate.buy + currencyRate.sell) / 2;

          if (currencyRate.buy < 10) {
            // Strong currencies (EUR, GBP)
            return avgCurrency / buyPrice;
          } else {
            // Weak currencies (ARS, CLP)
            return avgCurrency / buyPrice;
          }
        }
      }

      return 0;
    },
    [currencyData, buyPrice, currencies]
  );

  const handleConvert = useCallback(() => {
    const rate = calculateRate(fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * rate;
    setResult(convertedAmount.toFixed(2));

    // Guardar conversión en el historial
    const conversion = {
      id: Date.now().toString(),
      from: fromCurrency,
      to: toCurrency,
      amount: parseFloat(amount),
      result: convertedAmount,
      rate: rate,
      timestamp: new Date(),
    };

    setConversionHistory((prev) => [conversion, ...prev]);
  }, [fromCurrency, toCurrency, amount, calculateRate]);

  // Get current exchange rate for display
  const currentRate = useMemo(() => {
    return calculateRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, calculateRate]);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Calculadora de Divisas{" "}
              {buyPrice ? `Bs ${buyPrice.toFixed(2)}` : "Bs --"}
            </h2>
            {loading && p2pLoading && (
              <p className="text-sm text-gray-500 mt-2">
                Cargando tasas de cambio...
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Conversor
              </h3>
              <p className="text-gray-600 mb-6">
                Convierte entre diferentes monedas
              </p>

              {/* Conversion Form */}
              <div className="space-y-4">
                {/* From Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desde
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1"
                      placeholder="100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {currencies.find((c) => c.code === fromCurrency)?.name}
                  </p>
                </div>

                {/* To Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hacia
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="text"
                      value={result}
                      readOnly
                      className="flex-1 bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {currencies.find((c) => c.code === toCurrency)?.name}
                  </p>
                </div>

                {/* Exchange Rate */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tasa de cambio:</strong> 1 {fromCurrency} ={" "}
                    {currentRate.toFixed(4)} {toCurrency}
                  </p>
                  {loading && p2pLoading && (
                    <p className="text-xs text-blue-600 mt-1">
                      Actualizando tasas...
                    </p>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {[10, 50, 100, 500].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(value.toString())}
                      className="text-xs"
                    >
                      {value}
                    </Button>
                  ))}
                </div>

                {/* Convert Button */}
                <Button
                  onClick={handleConvert}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading || p2pLoading || !currentRate}
                >
                  {loading || p2pLoading ? "Cargando..." : "Convertir"}
                </Button>
              </div>
            </motion.div>

            {/* Conversion History */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Historial de Conversiones
                </h3>
                {conversionHistory.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConversionHistory([])}
                    className="text-gray-600 hover:text-red-600"
                  >
                    Limpiar historial
                  </Button>
                )}
              </div>

              {/* History Content */}
              {conversionHistory.length === 0 ? (
                <div className="flex flex-col items-center pt-36">
                  <ChartCandlestick className="w-10 h-10 text-gray-600" />
                  <p className="text-gray-600">
                    Realiza tu primera conversión para ver el historial
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversionHistory.map((conversion) => (
                    <div
                      key={conversion.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="text-sm">
                            {conversion.amount} {conversion.from}
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="text-sm font-semibold">
                            {conversion.result.toFixed(2)} {conversion.to}
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>Tasa: {conversion.rate.toFixed(2)}</div>
                          <div>
                            {conversion.timestamp.toLocaleTimeString("es-BO", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

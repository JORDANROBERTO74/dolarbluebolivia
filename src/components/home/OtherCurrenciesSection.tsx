"use client";

import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";
import { ExchangeCurrenciesData } from "@/hooks/useExchangeCurrencies";
import { Skeleton } from "@/components/ui/skeleton";

interface OtherCurrenciesSectionProps {
  currencyData: ExchangeCurrenciesData | null;
  loading: boolean;
  buyPrice: number;
  p2pLoading: boolean;
}

// Datos estáticos de la sección
const sectionData = {
  title: "Otras Divisas",
};

export default function OtherCurrenciesSection({
  currencyData,
  loading,
  buyPrice,
  p2pLoading,
}: OtherCurrenciesSectionProps) {
  // Currency mapping for display (memoized for performance)
  const currencyMapping = useMemo(
    () => [
      { key: "Euro", name: "Euro", code: "EUR", flag: "🇪🇺" },
      {
        key: "Libra Esterlina",
        name: "Libra Esterlina",
        code: "GBP",
        flag: "🇬🇧",
      },
      {
        key: "Peso Argentino",
        name: "Peso Argentino",
        code: "ARS",
        flag: "🇦🇷",
      },
      { key: "Peso Chileno", name: "Peso Chileno", code: "CLP", flag: "🇨🇱" },
      {
        key: "Real Brasileño",
        name: "Real Brasileño",
        code: "BRL",
        flag: "🇧🇷",
      },
      { key: "Sol Peruano", name: "Sol Peruano", code: "PEN", flag: "🇵🇪" },
      { key: "Yuan Chino", name: "Yuan Chino", code: "CNY", flag: "🇨🇳" },
    ],
    []
  );

  // Calculate BOB values using P2P buy price (memoized for performance)
  const calculateBobValue = useCallback(
    (currencyRate: { buy: number; sell: number }) => {
      // Validate buyPrice before calculation
      if (!buyPrice || buyPrice <= 0) {
        return "0.00";
      }

      const usdBobBuy = buyPrice; // Use P2P buy price
      const currencyBuy = currencyRate.buy; // Use buy price for currency

      // Validate currency rate
      if (!currencyBuy || currencyBuy <= 0) {
        return "0.00";
      }

      // For currencies like EUR, GBP (strong currencies)
      if (currencyRate.buy < 10) {
        return ((1 / currencyBuy) * usdBobBuy).toFixed(2);
      }
      // For currencies like ARS, CLP (weak currencies)
      else {
        return (usdBobBuy / currencyBuy).toFixed(4);
      }
    },
    [buyPrice]
  );

  // Check if we have valid data for calculations
  const hasValidData = currencyData?.data && buyPrice && buyPrice > 0;
  const isAnyLoading = loading || p2pLoading;

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

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {sectionData.title}
              </h2>
            </div>
            {currencyData?.lastUpdate && (
              <p className="text-sm text-gray-500 mt-2">
                Última actualización: {currencyData.lastUpdate}
              </p>
            )}
            {!hasValidData && !isAnyLoading && (
              <p className="text-sm text-yellow-600 mt-2">
                ⚠️ Esperando datos de precios para calcular valores en BOB
              </p>
            )}
          </motion.div>

          {/* Currency Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                      Moneda
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                      1 USD equivale a:
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                      1 Unidad en BOB
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isAnyLoading && !hasValidData ? (
                    // Loading skeleton
                    Array.from({ length: 7 }).map((_, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b border-gray-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-6 rounded" />
                            <Skeleton className="w-32 h-4" />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="w-20 h-4" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="w-24 h-4" />
                        </td>
                      </tr>
                    ))
                  ) : hasValidData ? (
                    // Real data
                    currencyMapping.map((currency) => {
                      const currencyData_item = currencyData.data![
                        currency.key as keyof typeof currencyData.data
                      ] as { buy: number; sell: number };
                      const bobValue = calculateBobValue(currencyData_item);
                      const usdEquivalent =
                        currencyData_item.buy < 10
                          ? `${currencyData_item.buy.toFixed(2)} ${
                              currency.code
                            }`
                          : `${currencyData_item.buy.toFixed(0)} ${
                              currency.code
                            }`;

                      return (
                        <motion.tr
                          key={currency.code}
                          variants={itemVariants}
                          className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-600">
                                {currency.flag}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {currency.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {usdEquivalent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {bobValue} BOB
                          </td>
                        </motion.tr>
                      );
                    })
                  ) : (
                    // No data fallback
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        {!currencyData?.data
                          ? "No hay datos de divisas disponibles"
                          : !buyPrice || buyPrice <= 0
                          ? "Esperando precio USD/BOB para calcular valores"
                          : "Error en los datos"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              * Las cotizaciones se actualizan en tiempo real según las fuentes
              disponibles
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

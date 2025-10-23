"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, Check, ExternalLink, Shield, Clock, Zap } from "lucide-react";
import BinanceIcon from "../common/icons/binanceIcon";
import AirtmIcon from "../common/icons/airtmIcon";
import MeruIcon from "../common/icons/meruIcon";
import TakenosIcon from "../common/icons/takenosIcon";

// Textos estáticos
const sectionData = {
  title: "Plataformas Recomendadas",
  subtitle:
    "Las mejores plataformas para comprar y vender USD/USDT/USDC de forma segura y confiable.",
};

export default function PlatformsSection() {
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

  // Platform data structure - Updated with real information from 2024
  const platforms = [
    {
      id: "airtm",
      name: "Airtm",
      logo: "airtm",
      rating: 4.6,
      description:
        "Plataforma de intercambio peer-to-peer que permite convertir dinero digital en efectivo y viceversa de forma segura.",
      features: [
        "Intercambio P2P seguro",
        "Múltiples métodos de pago",
        "Soporte 24/7",
        "Sin comisiones ocultas",
      ],
      color: "border-blue-200 bg-blue-50",
      commission: "0-2%",
      methods: "P2P, Transferencia, QR",
      time: "2-10min",
      url: "https://airtm.com",
      primaryAction: "Abrir Airtm",
    },
    {
      id: "binance",
      name: "Binance",
      logo: "binance",
      rating: 4.8,
      description:
        "El exchange de criptomonedas más grande del mundo con más de 600 criptomonedas disponibles. Volumen diario de $45 mil millones.",
      features: [
        "Comisiones desde 0.015%",
        "Más de 600 criptomonedas",
        "Trading P2P disponible",
        "Predicciones con IA",
      ],
      color: "border-orange-200 bg-orange-50",
      commission: "0.015-0.1%",
      methods: "P2P, Tarjeta, Transferencia",
      time: "2-15min",
      url: "https://binance.com",
      primaryAction: "Abrir Binance",
    },
    {
      id: "meru",
      name: "Meru",
      logo: "meru",
      rating: 4.4,
      description:
        "Plataforma fintech que ofrece cuentas bancarias virtuales y servicios de intercambio de criptomonedas.",
      features: [
        "Cuentas bancarias virtuales",
        "Intercambio de crypto",
        "Transferencias rápidas",
        "KYC simplificado",
      ],
      color: "border-green-200 bg-green-50",
      commission: "1-3%",
      methods: "Banco, QR, P2P",
      time: "5-15min",
      url: "https://meru.com",
      primaryAction: "Abrir Meru",
    },
    {
      id: "takenos",
      name: "Takenos",
      logo: "takenos",
      rating: 4.5,
      description:
        "Plataforma de pagos internacionales que permite recibir dinero en dólares y criptomonedas al instante.",
      features: [
        "Pagos internacionales",
        "Múltiples divisas",
        "Sin fronteras",
        "Transferencias instantáneas",
      ],
      color: "border-pink-200 bg-pink-50",
      commission: "0.5-1%",
      methods: "Transferencia, QR, Crypto",
      time: "1-5min",
      url: "https://takenos.com",
      primaryAction: "Abrir Takenos",
    },
  ];

  // Logo mapping function
  const getLogoComponent = (logoName: string) => {
    const logoMap = {
      airtm: <AirtmIcon className="w-12 h-12" />,
      binance: <BinanceIcon className="w-12 h-12" />,
      meru: <MeruIcon className="w-12 h-12" />,
      takenos: <TakenosIcon className="w-12 h-12" />,
    };
    return (
      logoMap[logoName as keyof typeof logoMap] || (
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
      )
    );
  };

  // Star rating function
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 fill-current" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300 fill-current"
          />
        ))}
      </>
    );
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {sectionData.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {sectionData.subtitle}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700 font-medium">
                Datos actualizados en tiempo real - Octubre 2025
              </span>
            </div>
          </motion.div>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {platforms.map((platform) => (
              <motion.div
                key={platform.id}
                variants={itemVariants}
                className={`flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border ${platform.color} hover:scale-105`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center">
                      {getLogoComponent(platform.logo)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(platform.rating)}
                        <span className="text-sm text-gray-600 ml-2">
                          {platform.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {platform.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {platform.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => window.open(platform.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {platform.primaryAction}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">4+</div>
              <div className="text-sm text-gray-600">
                Plataformas Verificadas
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Tiempo de Actividad</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-gray-600">Soporte Disponible</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-primary mb-2">60.1%</div>
              <div className="text-sm text-gray-600">Comisiones Desde</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

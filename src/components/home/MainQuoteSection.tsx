"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  AlertCircle,
  Info,
  Clock,
  Camera,
  CalendarDays,
  Link as LinkIcon,
  BarChart3,
  FileImage,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Textos estáticos
const sectionData = {
  title: "Cotización Paralela",
  buyLabel: "💸 Compra",
  sellLabel: "💰 Venta",
  description:
    "Precio al que puedes comprar dólares en el mercado paralelo boliviano, actualizado en tiempo real",
  lastUpdate: "Última actualización",
  captureButton: "Capturar Cotización",
};

interface MainQuoteSectionProps {
  buyPrice: number;
  sellPrice: number;
  lastUpdate: string;
  isLoading: boolean;
  error: string | null;
}

export default function MainQuoteSection({
  buyPrice,
  sellPrice,
  lastUpdate,
  isLoading,
  error,
}: MainQuoteSectionProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="bg-white min-h-screen py-8 pt-20">
      <div className="w-full px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1488px] mx-auto"
        >
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Main Quote */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Main Title */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2">
                  Cotización
                  <br />
                  <span className="text-blue-600">Paralela</span>
                </h1>
              </div>

              {/* Toggle Buttons */}
              <div className="flex gap-2">
                <div className="flex gap-1 p-1 rounded-3xl bg-white shadow-lg border border-gray-200">
                  <button
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      activeTab === "buy"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-accent"
                    }`}
                    onClick={() => setActiveTab("buy")}
                  >
                    {sectionData.buyLabel}
                  </button>
                  <button
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      activeTab === "sell"
                        ? "bg-[#059669] text-white"
                        : "bg-white text-gray-700 hover:bg-accent"
                    }`}
                    onClick={() => setActiveTab("sell")}
                  >
                    {sectionData.sellLabel}
                  </button>
                </div>
              </div>

              {/* Main Quote Display */}
              <div>
                <div className="text-6xl lg:text-7xl font-extrabold text-blue-600 mb-2">
                  {isLoading ? (
                    <div className="flex items-center gap-4">
                      <RefreshCw className="w-12 h-12 animate-spin text-primary" />
                      <div>Cargando...</div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center gap-4">
                      <AlertCircle className="w-12 h-12 text-red-600" />
                      <span className="text-red-600">Error</span>
                    </div>
                  ) : (
                    `Bs ${
                      activeTab === "buy"
                        ? buyPrice.toFixed(2)
                        : sellPrice.toFixed(2)
                    }`
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-gray-600 font-medium">
                    Precio de {activeTab === "buy" ? "Compra" : "Venta"}
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <div className="flex items-center gap-1">
                          <Info className="w-3 h-3 text-gray-600" />
                          <p className="text-sm text-gray-600 font-medium">
                            Fuentes
                          </p>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Binance P2P</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {/* Description */}
                <div className="max-w-[450px]">
                  <p className="text-lg text-gray-600 font-normal leading-relaxed">
                    {sectionData.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Update Card */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl p-8 py-12 shadow-xl sticky top-8 flex flex-col justify-center min-h-[280px] border border-gray-200">
                {/* Last Update Info */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Última actualización
                    </span>
                  </div>
                  <div className="text-lg font-normal text-gray-900">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Actualizando...</span>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Error de conexión</span>
                      </div>
                    ) : (
                      lastUpdate
                    )}
                  </div>
                </div>

                {/* Capture Button */}
                <div className="mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full h-12 text-base"
                        disabled={isLoading}
                      >
                        <Camera className="w-6 h-6" />
                        {isLoading
                          ? "Actualizando..."
                          : sectionData.captureButton}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Button variant="secondary" size="icon">
                            <FileImage className="w-6 h-6 text-primary" />
                          </Button>
                          Captura de Cotización
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Logo and Title */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                              <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                              DolarBlue Bolivia
                            </span>
                          </div>
                          <h2 className="text-4xl font-extrabold text-gray-900 mb-1">
                            Cotización del Día
                          </h2>
                          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                            <LinkIcon className="w-3 h-3" />
                            <span>https://www.dolarbluebolivia.click</span>
                          </div>
                        </div>

                        {/* Price Info */}
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-1">
                            USDT en Bs:
                          </div>
                          <div className="text-4xl font-bold text-gray-900">
                            Bs{" "}
                            {activeTab === "buy"
                              ? buyPrice.toFixed(2)
                              : sellPrice.toFixed(2)}
                          </div>
                        </div>

                        {/* Date and Time */}
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>{lastUpdate.split(",")[0]}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{lastUpdate.split(",")[1]?.trim()}</span>
                          </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-orange-600 border-orange-600 hover:bg-orange-50"
                          >
                            PNG
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            JPEG
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            SVG
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

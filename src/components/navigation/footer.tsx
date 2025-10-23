"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Datos estáticos del footer
const footerData = {
  company: {
    name: "Dólar Blue Bolivia",
    description:
      "Plataforma de información referencial basada en fuentes públicas y mercados P2P.",
  },
  legalNotice: {
    title: "Aviso Legal",
    content:
      "Las cotizaciones provienen de mercados paralelos y plataformas P2P públicas. La información se ofrece sin que esto constituya recomendación financiera. Dólar oficial BCB: 6.96 Bs.",
    lastUpdate: "Última actualización: 19/10/2025",
  },
  usefulData: {
    title: "Datos Útiles",
    links: [
      { name: "Transferencia de Dólares", href: "/transferencia" },
      { name: "Sobre nosotros", href: "/about" },
      { name: "Contacto", href: "/contact" },
      { name: "Términos", href: "/terms" },
      { name: "Privacidad", href: "/privacy" },
    ],
    contact: "jordanroberto74@gmail.com",
  },
  copyright: "© 2025 Dólar Blue Bolivia",
};

export default function Footer() {
  const { company, legalNotice, usefulData } = footerData;

  return (
    <footer className="bg-gray-900 text-white w-full" role="contentinfo">
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                {/* Logo */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 relative">
                      <Image
                        src="/img/logo.png"
                        alt="Dólar Blue Bolivia"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {company?.name}
                    </h3>
                  </Link>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {company?.description}
                </p>
              </div>

              {/* Legal Notice */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-400 text-lg">🔥</span>
                  <span className="text-red-400 font-semibold text-sm">
                    {legalNotice?.title}
                  </span>
                </div>
                <p className="text-red-300 text-xs leading-relaxed">
                  {legalNotice?.content}
                </p>
                <p className="text-red-400 text-xs mt-2">
                  {legalNotice?.lastUpdate}
                </p>
              </div>
            </motion.div>

            {/* Useful Data */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6" id="useful-data">
                {usefulData?.title}
              </h3>
              <ul className="space-y-3 mb-6" aria-labelledby="useful-data">
                {usefulData?.links?.map((link: any, index: number) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight
                        className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Contacto
                  </span>
                </div>
                <a
                  href={`mailto:${usefulData?.contact}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  {usefulData?.contact}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              {footerData.copyright}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm"
            >
              <div className="text-gray-400 hover:text-white transition-colors">
                Roberto Jordan - Software Dev.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

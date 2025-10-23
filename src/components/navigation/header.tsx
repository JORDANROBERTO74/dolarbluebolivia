"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Menu items estáticos
const menuItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Tipos de Cambio", href: "#tipos-cambio" },
  { name: "Calculadora", href: "#calculadora" },
  { name: "P2P", href: "#p2p" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Detectar scroll para agregar sombra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = "Dólar Blue Bolivia";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 transition-shadow duration-300",
        isScrolled ? "shadow-lg" : "shadow-md"
      )}
    >
      <div className="w-full px-16">
        <div className="flex h-16 items-center justify-between max-w-[1488px] mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#inicio"
              className="flex items-center space-x-3 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                closeMenu();
              }}
            >
              <div className="w-8 h-8 relative">
                <Image
                  src="/img/logo.png"
                  alt="Dólar Blue Bolivia"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {logoText}
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation menuItems={menuItems} pathname={pathname} />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          menuItems={menuItems}
          isOpen={isMenuOpen}
          onClose={closeMenu}
          pathname={pathname}
        />
      </div>
    </header>
  );
};

export default Header;

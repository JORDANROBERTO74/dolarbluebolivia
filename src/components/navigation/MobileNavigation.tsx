"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  menuItems: any[];
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  menuItems,
  isOpen,
  onClose,
  pathname,
}) => {
  const [activeSection, setActiveSection] = useState<string>("#inicio");

  useEffect(() => {
    if (!isOpen) return;

    // Observar qué sección está visible
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observar todas las secciones
    menuItems.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [menuItems, isOpen]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (section) {
      const headerOffset = 80; // Altura del header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    onClose(); // Cerrar el menú móvil después de hacer clic
  };

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="space-y-1 pb-3 pt-2">
        {menuItems.map((item: any) => {
          const isActive = activeSection === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "block px-3 py-2 text-base font-medium transition-colors cursor-pointer",
                isActive
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {item.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;

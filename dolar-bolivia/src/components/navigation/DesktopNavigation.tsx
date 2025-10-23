"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  menuItems: any[];
  pathname: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  menuItems,
  pathname,
}) => {
  const [activeSection, setActiveSection] = useState<string>("#inicio");

  useEffect(() => {
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
  }, [menuItems]);

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
  };

  return (
    <nav
      className="hidden md:flex items-center space-x-8"
      role="navigation"
      aria-label="Main navigation"
    >
      {menuItems.map((item: any) => {
        const isActive = activeSection === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={cn(
              "text-sm font-medium transition-colors cursor-pointer",
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
};

export default DesktopNavigation;

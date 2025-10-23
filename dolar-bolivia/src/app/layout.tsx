import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import MainContent from "@/components/navigation/MainContent";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "@/components/clientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Dólar Blue Bolivia | Cotización Paralela en Tiempo Real",
  description:
    "Cotización del dólar paralelo en Bolivia actualizada en tiempo real. Información de tipos de cambio, calculadora de divisas, plataformas P2P y restricciones bancarias.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords:
    "dólar blue bolivia, cotización dólar, tipo de cambio, USDT, USDC, criptomonedas, boliviano",
  openGraph: {
    title: "Dólar Blue Bolivia - Cotización Paralela",
    description: "Cotización del dólar paralelo en Bolivia en tiempo real",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("font-sans antialiased h-screen", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <div className="h-full flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
            <ClientProvider>
              <TooltipProvider>
                <Header />
                <MainContent>{children}</MainContent>
                <Footer />
                <Toaster />
              </TooltipProvider>
            </ClientProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}

#### English version

<div align="center"><strong>Dólar Blue Bolivia - Real-Time Parallel Dollar Exchange Rate</strong></div>
<div align="center">Built with Next.js 14 App Router</div>
<br />

## Description

Dólar Blue Bolivia is a web application that provides real-time information about the parallel dollar exchange rate in Bolivia. The platform displays updated quotations, currency converters, recommended P2P platforms, and relevant financial information for the Bolivian market.

## Technologies Used

### Core

- Framework - [Next.js 14.1.0 (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Formatting - [Prettier](https://prettier.io)
- Deployment - [Vercel](https://vercel.com)

### UI/UX

- Components - [shadcn/ui](https://ui.shadcn.com)
- Primitives - [Radix UI](https://www.radix-ui.com)
- Animations - [Framer Motion](https://www.framer.com/motion)
- Icons - [Lucide React](https://lucide.dev)
- Theme - [next-themes](https://github.com/pacocoursey/next-themes)

### Data Management

- State - React Hooks (useState, useMemo, useCallback)
- Data Fetching - Custom hooks with native fetch API
- Cache Provider - [React Query](https://tanstack.com/query)

## Key Features

- 💰 **Real-Time Quotations** - Buy/sell prices updated from Binance P2P
- 🌍 **Multiple Currencies** - Comparison with 7 international currencies
- 🧮 **Currency Calculator** - Convert between multiple currencies
- 📊 **Recommended Platforms** - P2P platforms (Airtm, Binance, Meru, etc.)
- 📱 **Responsive Design** - Optimized for mobile and desktop
- 🎨 **Modern Animations** - Smooth interactions with Framer Motion
- ♿ **Accessibility** - ARIA labels and semantic HTML

## Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (exchange-currencies, p2p-price)
│   └── page.tsx           # Main page with sections
│
├── components/
│   ├── home/              # Section components
│   ├── navigation/        # Header and Footer
│   ├── common/            # Shared components
│   └── ui/                # shadcn/ui components (33)
│
├── hooks/                 # Custom hooks
│   ├── useP2PPrice.ts
│   └── useExchangeCurrencies.ts
│
└── lib/                   # Utilities
```

## APIs

1. **Exchange Currencies API** - External rates from dolarbluebolivia.click
2. **P2P Price API** - Real prices from Binance P2P marketplace

Both APIs auto-refresh every 60 seconds.

## Installation

```bash
# Clone the repository
git clone https://github.com/JORDANROBERTO74/dolarbluebolivia.git

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Purpose

This project was created to provide a reliable and up-to-date source of information about the parallel dollar exchange rate in Bolivia, helping users make informed financial decisions.

## Live Preview

The project is available at: [dolar-bolivia.vercel.app](https://dolar-bolivia.vercel.app) (if deployed)

## Contact

If you would like to learn more about this project or collaborate, feel free to contact me at jordanroberto74@gmail.com.

Thank you for visiting Dólar Blue Bolivia!

<br />

---

<br />

#### Versión en español

<div align="center"><strong>Dólar Blue Bolivia - Cotización del Dólar Paralelo en Tiempo Real</strong></div>
<div align="center">Construido con Next.js 14 App Router</div>
<br />

## Descripción

Dólar Blue Bolivia es una aplicación web que proporciona información en tiempo real sobre la cotización del dólar paralelo en Bolivia. La plataforma muestra cotizaciones actualizadas, conversores de divisas, plataformas P2P recomendadas e información financiera relevante para el mercado boliviano.

## Tecnologías Utilizadas

### Core

- Framework - [Next.js 14.1.0 (App Router)](https://nextjs.org)
- Lenguaje - [TypeScript](https://www.typescriptlang.org)
- Estilos - [Tailwind CSS](https://tailwindcss.com)
- Despliegue - [Vercel](https://vercel.com)

### UI/UX

- Componentes - [shadcn/ui](https://ui.shadcn.com)
- Primitivos - [Radix UI](https://www.radix-ui.com)
- Animaciones - [Framer Motion](https://www.framer.com/motion)
- Iconos - [Lucide React](https://lucide.dev)
- Temas - [next-themes](https://github.com/pacocoursey/next-themes)

### Gestión de Datos

- Estado - React Hooks (useState, useMemo, useCallback)
- Obtención de Datos - Hooks personalizados con fetch API nativo
- Proveedor de Caché - [React Query](https://tanstack.com/query)

## Características Principales

- 💰 **Cotizaciones en Tiempo Real** - Precios de compra/venta actualizados desde Binance P2P
- 🌍 **Múltiples Divisas** - Comparación con 7 monedas internacionales
- 🧮 **Calculadora de Divisas** - Convierte entre múltiples monedas
- 📊 **Plataformas Recomendadas** - Plataformas P2P (Airtm, Binance, Meru, etc.)
- 📱 **Diseño Responsivo** - Optimizado para móvil y escritorio
- 🎨 **Animaciones Modernas** - Interacciones suaves con Framer Motion
- ♿ **Accesibilidad** - Etiquetas ARIA y HTML semántico

## Arquitectura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (exchange-currencies, p2p-price)
│   └── page.tsx           # Página principal con secciones
│
├── components/
│   ├── home/              # Componentes de secciones
│   ├── navigation/        # Header y Footer
│   ├── common/            # Componentes compartidos
│   └── ui/                # Componentes shadcn/ui (33)
│
├── hooks/                 # Hooks personalizados
│   ├── useP2PPrice.ts
│   └── useExchangeCurrencies.ts
│
└── lib/                   # Utilidades
```

## APIs

1. **Exchange Currencies API** - Tasas externas de dolarbluebolivia.click
2. **P2P Price API** - Precios reales del marketplace P2P de Binance

Ambas APIs se actualizan automáticamente cada 60 segundos.

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JORDANROBERTO74/dolarbluebolivia.git

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## Variables de Entorno

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

## Propósito del Proyecto

Este proyecto fue creado para proporcionar una fuente confiable y actualizada de información sobre el tipo de cambio del dólar paralelo en Bolivia, ayudando a los usuarios a tomar decisiones financieras informadas.

## Vista Previa en Vivo

El proyecto está disponible en: [dolar-bolivia.vercel.app](https://dolar-bolivia.vercel.app) (si está desplegado)

## Contacto

Si deseas conocer más sobre este proyecto o colaborar, puedes contactarme en jordanroberto74@gmail.com.

¡Gracias por visitar Dólar Blue Bolivia!


## License

MIT. See [LICENSE](LICENSE).

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type Locale = "en" | "es";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string) => string;
};

const translations: Record<Locale, any> = {
  es: {
    nav: {
      home: "Inicio",
      marketplace: "Mercado",
      tokenize: "Tokenizar",
      dashboard: "Panel",
      iot: "IoT",
      voting: "Votación",
      launch: "Abrir aplicación",
    },
    home: {
      seoTitle: "AgroChain LATAM — Financiamiento tokenizado de equipos agrícolas",
      seoDescription:
        "Copropriedad de tractores, cosechadoras y plantas en LATAM. UX fintech profesional sobre Stellar/Soroban (simulado).",
      heroTitle: "Financia y copropiedad de equipos agrícolas en LATAM",
      heroSub:
        "Tokeniza tractores, cosechadoras, riego y plantas de proceso. Las cooperativas programan uso, distribuyen ingresos y gobiernan on‑chain.",
      heroAlt: "Equipo agrícola moderno en América Latina",
      ctaExplore: "Explorar Mercado",
      ctaTokenize: "Tokenizar Equipo",
      features: {
        credible: { title: "Modelo creíble", text: "UI de nivel bancario con economía de tokens y gobernanza transparente." },
        coop: { title: "Propiedad cooperativa", text: "Agrupa pequeños productores para co‑tener equipos de alto CAPEX." },
        soroban: { title: "Stellar/Soroban", text: "Flujos de contratos inteligentes simulados de extremo a extremo para el MVP." },
        yield: { title: "Retorno alineado", text: "Ingresos modelados por alquiler y tarifas por rendimiento." },
      },
    },
    marketplace: {
      seoTitle: "Mercado — Tokens de equipos AgroChain LATAM",
      seoDescription:
        "Invierte en equipos agrícolas tokenizados en Colombia, Brasil, México y Perú.",
      title: "Mercado de Equipos Copropiedad",
      subtitle: "Activos curados profesionalmente con especificaciones realistas y modelos de ingresos para la agricultura latinoamericana.",
    },
    equipmentCard: {
      projectedAPY: "APY proyectado",
      tokenSaleProgress: "Progreso de la venta de tokens",
      tokensSold: "tokens vendidos",
      invest10: "Invertir 10 tokens",
      soldOut: "Agotado",
    },
    tokenize: {
      seoTitle: "Tokenizar equipo — AgroChain LATAM",
      seoDescription:
        "Sube detalles, fotos y especificaciones para crear activos tokenizados para cooperativas en LATAM.",
      title: "Tokenizar equipo agrícola",
      detailsTitle: "Detalles del equipo",
      fields: {
        name: "Nombre del equipo",
        location: "Ubicación (Ciudad, Región, País)",
        priceUSD: "Precio (USD)",
        tokenSupply: "Suministro de tokens",
        projectedAPY: "APY proyectado (%)",
        revenueModel: "Modelo de ingresos",
        specs: "Especificaciones (una por línea)",
        photo: "Foto del equipo",
        previewAlt: "Vista previa del equipo",
        submit: "Crear activo tokenizado",
      },
    },
    iot: {
      seoTitle: "Simulación IoT — Seguimiento de equipos | AgroChain LATAM",
      seoDescription: "Simula GPS y horas de uso para equipos tokenizados en América Latina.",
      title: "Simulación IoT",
      equipment: "Equipo",
      select: "Seleccionar equipo",
      start: "Iniciar simulación",
      stop: "Detener simulación",
      live: "Telemetría en vivo (Mock)",
      gpsLat: "Latitud GPS",
      gpsLng: "Longitud GPS",
      usageHours: "Horas de uso",
    },
    voting: {
      seoTitle: "Votación cooperativa — Gobernanza | AgroChain LATAM",
      seoDescription: "Vota decisiones cooperativas para equipos tokenizados en América Latina.",
      title: "Votación cooperativa",
    },
    notFound: {
      oops: "¡Ups! Página no encontrada",
      back: "Volver al inicio",
    },
    dashboard: {
      seoTitle: "Panel — Propiedad y Retornos | AgroChain LATAM",
      seoDescription:
        "Sigue tus tokens de equipo, APY proyectado y pagos cooperativos.",
      title: "Tu Propiedad",
      empty: "Aún no posees tokens. Visita el mercado para invertir.",
      tokensOwned: "Tokens en propiedad",
      ownershipShare: "Participación",
      projectedAPY: "APY proyectado",
      projectedAnnual: "Retorno anual proyectado",
      claim: "Reclamar pago (Mock)",
      recent: "Actividad reciente",
      noTx: "Sin transacciones aún.",
    },
  },
  en: {
    nav: {
      home: "Home",
      marketplace: "Marketplace",
      tokenize: "Tokenize",
      dashboard: "Dashboard",
      iot: "IoT",
      voting: "Voting",
      launch: "Launch App",
    },
    home: {
      seoTitle: "AgroChain LATAM — Tokenized Farm Equipment Financing",
      seoDescription:
        "Co‑own tractors, harvesters, and processing plants across Latin America. Professional fintech UX built on Stellar/Soroban (mocked).",
      heroTitle: "Finance and Co‑Own Agricultural Equipment across LATAM",
      heroSub:
        "Tokenize tractors, combines, irrigation, and processing plants. Cooperatives schedule usage, distribute revenue, and govern via on‑chain voting.",
      heroAlt: "Modern agricultural equipment in Latin America",
      ctaExplore: "Explore Marketplace",
      ctaTokenize: "Tokenize Equipment",
      features: {
        credible: { title: "Credible Model", text: "Banking‑grade UI with transparent token economics and governance." },
        coop: { title: "Cooperative Ownership", text: "Pool smallholders to co‑own high‑capex equipment." },
        soroban: { title: "Stellar/Soroban", text: "Smart‑contract flows simulated end‑to‑end for MVP." },
        yield: { title: "Yield Aligned", text: "Returns modeled on rental + crop throughput fees." },
      },
    },
    marketplace: {
      seoTitle: "Marketplace — AgroChain LATAM Equipment Tokens",
      seoDescription:
        "Invest in tokenized agricultural equipment across Colombia, Brazil, Mexico, and Peru.",
      title: "Co‑owned Equipment Marketplace",
      subtitle:
        "Professionally curated assets with realistic specs and revenue models for Latin American agriculture.",
    },
    equipmentCard: {
      projectedAPY: "Projected APY",
      tokenSaleProgress: "Token Sale Progress",
      tokensSold: "tokens sold",
      invest10: "Invest 10 tokens",
      soldOut: "Sold Out",
    },
    tokenize: {
      seoTitle: "Tokenize Equipment — AgroChain LATAM",
      seoDescription:
        "Upload equipment details, photos, and specs to create tokenized assets for cooperatives across Latin America.",
      title: "Tokenize Agricultural Equipment",
      detailsTitle: "Equipment Details",
      fields: {
        name: "Equipment Name",
        location: "Location (City, Region, Country)",
        priceUSD: "Price (USD)",
        tokenSupply: "Token Supply",
        projectedAPY: "Projected APY (%)",
        revenueModel: "Revenue Model",
        specs: "Specifications (one per line)",
        photo: "Equipment Photo",
        previewAlt: "Equipment preview",
        submit: "Create Tokenized Asset",
      },
    },
    iot: {
      seoTitle: "IoT Simulation — Equipment Tracking | AgroChain LATAM",
      seoDescription: "Simulate GPS and usage hours for tokenized equipment across Latin America.",
      title: "IoT Simulation",
      equipment: "Equipment",
      select: "Select equipment",
      start: "Start Simulation",
      stop: "Stop Simulation",
      live: "Live Telemetry (Mock)",
      gpsLat: "GPS Latitude",
      gpsLng: "GPS Longitude",
      usageHours: "Usage Hours",
    },
    voting: {
      seoTitle: "Cooperative Voting — Governance | AgroChain LATAM",
      seoDescription: "Vote on cooperative decisions for tokenized equipment across Latin America.",
      title: "Cooperative Voting",
    },
    notFound: {
      oops: "Oops! Page not found",
      back: "Return to Home",
    },
    dashboard: {
      seoTitle: "Dashboard — Ownership & Returns | AgroChain LATAM",
      seoDescription:
        "Track your equipment token holdings, projected APY, and cooperative payouts.",
      title: "Your Ownership",
      empty: "You don't own tokens yet. Visit the marketplace to invest.",
      tokensOwned: "Tokens Owned",
      ownershipShare: "Ownership Share",
      projectedAPY: "Projected APY",
      projectedAnnual: "Projected Annual Returns",
      claim: "Claim Payout (Mock)",
      recent: "Recent Activity",
      noTx: "No transactions yet.",
    },
  },
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  const t = useMemo(() => {
    const getter = (obj: any, path: string) =>
      path.split(".").reduce((acc: any, k: string) => (acc ? acc[k] : undefined), obj);
    return (key: string) => getter(translations[locale], key) ?? getter(translations.en, key) ?? key;
  }, [locale]);

  const value: LocaleContextValue = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

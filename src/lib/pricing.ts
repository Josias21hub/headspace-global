// Sistema de Preços Regionalizados

export type Region = "US" | "BR" | "IN" | "ID" | "CN" | "TH" | "SEA";

export interface RegionalPricing {
  currency: string;
  symbol: string;
  monthly: number;
  annual: number;
  programs: {
    anxiety21: number;
    sleep14: number;
    mantras: number;
    reset5: number;
  };
}

export const regionalPricing: Record<Region, RegionalPricing> = {
  US: {
    currency: "USD",
    symbol: "$",
    monthly: 0.99,
    annual: 4.49,
    programs: {
      anxiety21: 2.99,
      sleep14: 1.99,
      mantras: 3.99,
      reset5: 2.49,
    },
  },
  BR: {
    currency: "BRL",
    symbol: "R$",
    monthly: 4.99,
    annual: 19.99,
    programs: {
      anxiety21: 14.99,
      sleep14: 9.99,
      mantras: 19.99,
      reset5: 12.49,
    },
  },
  IN: {
    currency: "INR",
    symbol: "₹",
    monthly: 49,
    annual: 199,
    programs: {
      anxiety21: 149,
      sleep14: 99,
      mantras: 199,
      reset5: 129,
    },
  },
  ID: {
    currency: "IDR",
    symbol: "Rp",
    monthly: 14900,
    annual: 59900,
    programs: {
      anxiety21: 44900,
      sleep14: 29900,
      mantras: 59900,
      reset5: 39900,
    },
  },
  CN: {
    currency: "CNY",
    symbol: "¥",
    monthly: 6.99,
    annual: 29.99,
    programs: {
      anxiety21: 19.99,
      sleep14: 13.99,
      mantras: 26.99,
      reset5: 16.99,
    },
  },
  TH: {
    currency: "THB",
    symbol: "฿",
    monthly: 35,
    annual: 149,
    programs: {
      anxiety21: 99,
      sleep14: 69,
      mantras: 139,
      reset5: 89,
    },
  },
  SEA: {
    currency: "USD",
    symbol: "$",
    monthly: 0.99,
    annual: 4.49,
    programs: {
      anxiety21: 2.99,
      sleep14: 1.99,
      mantras: 3.99,
      reset5: 2.49,
    },
  },
};

export function detectRegion(language: string): Region {
  const regionMap: Record<string, Region> = {
    en: "US",
    "pt-BR": "BR",
    hi: "IN",
    id: "ID",
    zh: "CN",
    th: "TH",
  };
  return regionMap[language] || "US";
}

export function formatPrice(amount: number, region: Region): string {
  const pricing = regionalPricing[region];
  
  // Formatação especial para moedas asiáticas
  if (region === "ID") {
    return `${pricing.symbol} ${amount.toLocaleString("id-ID")}`;
  }
  if (region === "IN") {
    return `${pricing.symbol} ${amount.toLocaleString("en-IN")}`;
  }
  if (region === "CN") {
    return `${pricing.symbol} ${amount.toFixed(2)}`;
  }
  if (region === "TH") {
    return `${pricing.symbol} ${amount.toLocaleString("th-TH")}`;
  }
  if (region === "BR") {
    return `${pricing.symbol} ${amount.toFixed(2).replace(".", ",")}`;
  }
  
  return `${pricing.symbol} ${amount.toFixed(2)}`;
}

export function getPricing(region: Region) {
  return regionalPricing[region];
}

import type { CountryCode } from "./geolocation";
import { useCountry } from "./geolocation";

export interface PlanPricing {
  originalPrice: string;
  price: string;
  saveAmount: string;
  currency: string;
  currencySymbol: string;
}

interface CountryPricing {
  starter: PlanPricing;
  standard: PlanPricing;
  premium: PlanPricing;
}

const pricingByCountry: Record<CountryCode, CountryPricing> = {
  PK: {
    starter: { originalPrice: "39,000", price: "30,000", saveAmount: "9,000", currency: "PKR", currencySymbol: "PKR" },
    standard: { originalPrice: "77,000", price: "59,000", saveAmount: "18,000", currency: "PKR", currencySymbol: "PKR" },
    premium: { originalPrice: "1,16,000", price: "89,000", saveAmount: "27,000", currency: "PKR", currencySymbol: "PKR" },
  },
  AE: {
    starter: { originalPrice: "799", price: "549", saveAmount: "250", currency: "AED", currencySymbol: "AED" },
    standard: { originalPrice: "1,499", price: "1,049", saveAmount: "450", currency: "AED", currencySymbol: "AED" },
    premium: { originalPrice: "2,249", price: "1,575", saveAmount: "674", currency: "AED", currencySymbol: "AED" },
  },
  US: {
    starter: { originalPrice: "219", price: "149", saveAmount: "70", currency: "USD", currencySymbol: "$" },
    standard: { originalPrice: "419", price: "289", saveAmount: "130", currency: "USD", currencySymbol: "$" },
    premium: { originalPrice: "629", price: "439", saveAmount: "190", currency: "USD", currencySymbol: "$" },
  },
  GB: {
    starter: { originalPrice: "169", price: "119", saveAmount: "50", currency: "GBP", currencySymbol: "£" },
    standard: { originalPrice: "329", price: "229", saveAmount: "100", currency: "GBP", currencySymbol: "£" },
    premium: { originalPrice: "489", price: "345", saveAmount: "144", currency: "GBP", currencySymbol: "£" },
  },
};

export function getPricing(countryCode: CountryCode): CountryPricing {
  return pricingByCountry[countryCode] || pricingByCountry.PK;
}

export function usePricing(): CountryPricing {
  const { country } = useCountry();
  return getPricing(country.code);
}

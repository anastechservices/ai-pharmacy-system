import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type CountryCode = "PK" | "AE" | "US" | "GB";

export interface CountryConfig {
  code: CountryCode;
  currency: string;
  currencySymbol: string;
  secondLang: { code: string; label: string } | null;
  whatsappNumber: string;
}

const countryConfigs: Record<CountryCode, CountryConfig> = {
  PK: {
    code: "PK",
    currency: "PKR",
    currencySymbol: "PKR",
    secondLang: { code: "ur", label: "اردو" },
    whatsappNumber: "+92 327 6393019",
  },
  AE: {
    code: "AE",
    currency: "AED",
    currencySymbol: "AED",
    secondLang: { code: "ar", label: "عربي" },
    whatsappNumber: "+92 327 6393019",
  },
  US: {
    code: "US",
    currency: "USD",
    currencySymbol: "$",
    secondLang: null,
    whatsappNumber: "+92 327 6393019",
  },
  GB: {
    code: "GB",
    currency: "GBP",
    currencySymbol: "£",
    secondLang: null,
    whatsappNumber: "+92 327 6393019",
  },
};

const DEFAULT_COUNTRY: CountryCode = "PK";

interface CountryContextType {
  country: CountryConfig;
  loading: boolean;
}

const CountryContext = createContext<CountryContextType>({
  country: countryConfigs[DEFAULT_COUNTRY],
  loading: true,
});

export function useCountry() {
  return useContext(CountryContext);
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<CountryConfig>(countryConfigs[DEFAULT_COUNTRY]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("detected_country");
    if (cached && cached in countryConfigs) {
      setCountry(countryConfigs[cached as CountryCode]);
      setLoading(false);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const code = data?.country_code as string;
        if (code && code in countryConfigs) {
          sessionStorage.setItem("detected_country", code);
          setCountry(countryConfigs[code as CountryCode]);
        } else {
          sessionStorage.setItem("detected_country", DEFAULT_COUNTRY);
        }
      })
      .catch(() => {
        sessionStorage.setItem("detected_country", DEFAULT_COUNTRY);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <CountryContext.Provider value={{ country, loading }}>
      {children}
    </CountryContext.Provider>
  );
}

export { countryConfigs };

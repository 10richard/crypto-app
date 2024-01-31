"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Currency {
  abbr: string;
  symbol: string;
}

interface CurrencyContextProps {
  currentCurrency: Currency;
  setCurrentCurrency: (val: Currency) => void;
}

export const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined
);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultCurrency = { abbr: "usd", symbol: "$" };
  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedCurrency = localStorage.getItem("currency");
    if (storedCurrency) {
      setCurrentCurrency(JSON.parse(storedCurrency));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("currency", JSON.stringify(currentCurrency));
    }
  }, [currentCurrency, isClient]);

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrentCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

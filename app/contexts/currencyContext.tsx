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
  const storedCurrency =
    typeof window !== "undefined" ? localStorage.getItem("currency") : null;
  const initialCurrency =
    storedCurrency && storedCurrency !== "undefined"
      ? JSON.parse(storedCurrency)
      : { abbr: "usd", symbol: "$" };

  const [currentCurrency, setCurrentCurrency] = useState(initialCurrency);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currency", JSON.stringify(currentCurrency));
    }
  }, [currentCurrency]);

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrentCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

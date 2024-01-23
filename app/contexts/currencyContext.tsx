import { createContext, useContext, useEffect, useState } from "react";

interface CurrencyContextProps {
  currentCurrency: string;
  setCurrentCurrency: (val: string) => void;
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
  const initialTheme =
    storedCurrency && storedCurrency !== "undefined"
      ? JSON.parse(storedCurrency)
      : "usd";

  const [currentCurrency, setCurrentCurrency] = useState(initialTheme);

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

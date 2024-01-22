"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  currentTheme: string;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDarkTheme: () => boolean;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  const initialTheme =
    storedTheme && storedTheme !== "undefined"
      ? JSON.parse(storedTheme)
      : "dark-theme";

  const [currentTheme, setCurrentTheme] = useState<string>(initialTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", JSON.stringify(currentTheme));
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(
      currentTheme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };

  const isDarkTheme = () => {
    return currentTheme === "dark-theme";
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, isDarkTheme }}>
      <div
        className="text-content-main bg-bkg-main"
        data-theme={currentTheme === "dark-theme" ? "dark" : "light"}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

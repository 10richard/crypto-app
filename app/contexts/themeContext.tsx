"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  currentTheme: string;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  const storedTheme = localStorage.getItem("theme");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : "dark-theme";

  const [currentTheme, setCurrentTheme] = useState<string>(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(
      currentTheme === "dark-theme" ? "light-theme" : "dark-theme"
    );
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <div data-theme={currentTheme === "dark-theme" ? "dark" : "light"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

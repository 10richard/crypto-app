import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export const ThemeProvider = () => {
  const storedThemeRaw = localStorage.getItem();
};

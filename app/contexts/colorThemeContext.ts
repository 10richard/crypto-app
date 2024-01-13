import useLocalStorage from "use-local-storage";
import { useContext, createContext } from "react";

const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const [theme, setTheme] = useLocalStorage(
  "theme",
  defaultDark ? "dark" : "light"
);

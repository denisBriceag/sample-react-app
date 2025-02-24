import { createContext, useContext } from "react";

export interface ThemeContextType {
  darkMode: boolean;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  switchTheme: () => {},
});

export const useTheme: () => ThemeContextType = () => {
  const themeContext = useContext<ThemeContextType>(ThemeContext);

  if (!themeContext)
    throw new Error("themeContext must be use withing a ThemeContext");

  return themeContext;
};

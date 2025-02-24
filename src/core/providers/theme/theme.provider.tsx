import { ReactElement, useState } from "react";
import { WrapperProps } from "../../types/props.type.ts";
import { ThemeContext, ThemeContextType } from "./theme.context.ts";
import { ConfigProvider } from "antd";
import { lightTheme, darkTheme } from "./theme.token.ts";

function isDarkTheme(): boolean {
  const darkTheme = localStorage.getItem("theme") ?? "false";

  return darkTheme === "true";
}

export default function ThemeProvider({
  children,
}: WrapperProps): ReactElement {
  const [darkMode, switchTheme] =
    useState<ThemeContextType["darkMode"]>(isDarkTheme());

  function handleTheme(): void {
    switchTheme(!darkMode);

    document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", String(!darkMode));
  }

  return (
    <ConfigProvider theme={{ token: darkMode ? darkTheme : lightTheme }}>
      <ThemeContext.Provider
        value={{ darkMode, switchTheme: () => handleTheme() }}
      >
        {children}
      </ThemeContext.Provider>
    </ConfigProvider>
  );
}

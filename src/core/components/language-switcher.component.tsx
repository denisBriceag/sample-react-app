import { ReactElement } from "react";
import { ConfigProvider, Select } from "antd";
import {
  Language,
  useLanguage,
} from "../providers/language/language.context.ts";
import { useTheme } from "../providers/theme/theme.context.ts";
import { darkTheme } from "../providers/theme/theme.token.ts";

export default function LanguageSwitcher(): ReactElement {
  const { language, switchLang } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: darkMode ? darkTheme.colorBgContainer : "#e6f4ff",
            colorBorder: darkMode ? "rgb(255 255 255 / 25%)" : "#d9d9d9",
            hoverBorderColor: darkMode ? "rgb(255 255 255 / 25%)" : "#4096ff",
            activeOutlineColor: darkMode
              ? "rgb(255 255 255 / 25%)"
              : "rgba(5,145,255,0.1)",
            activeBorderColor: darkMode ? "rgb(255 255 255 / 25%)" : "#1677ff",
          },
        },
      }}
    >
      <Select
        defaultValue={language}
        onChange={(language: keyof typeof Language) => switchLang(language)}
        style={{ width: 68 }}
        options={[
          { value: Language.ENGLISH, label: "EN" },
          { value: Language.RUSSIAN, label: "РУ" },
        ]}
      />
    </ConfigProvider>
  );
}

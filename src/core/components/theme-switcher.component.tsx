import { ReactElement } from "react";
import { useTheme } from "../providers/theme/theme.context.ts";
import { ConfigProvider, Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export default function ThemeSwitcher(): ReactElement {
  const { darkMode, switchTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            handleSize: 24,
            trackHeight: 28,
            innerMaxMargin: 30,
            trackPadding: 2,
          },
        },
      }}
    >
      <Switch
        onChange={() => switchTheme()}
        defaultChecked={!darkMode}
        checkedChildren={
          <SunOutlined style={{ fontSize: "1.25rem", paddingTop: "0.25rem" }} />
        }
        unCheckedChildren={<MoonOutlined style={{ fontSize: "1.25rem" }} />}
      />
    </ConfigProvider>
  );
}

import { ReactNode } from "react";
import {
  Avatar,
  ConfigProvider,
  Dropdown,
  Layout,
  MenuProps,
  theme,
} from "antd";
import { useAuth } from "../../auth/contexts/auth.context.ts";
import { useNavigate } from "react-router";
import ThemeSwitcher from "../../../core/components/theme-switcher.component.tsx";
import LanguageSwitcher from "../../../core/components/language-switcher.component.tsx";
import Logo from "../../../core/components/logo.component.tsx";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "../../../core/constants/routes.ts";

const { Header } = Layout;

export default function HeaderComponent(): ReactNode {
  const { name, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: 2,
      label: t("header.signOut"),
      onClick: () => signOut().then(() => navigate(AppRoutes.BASE)),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            activeBarWidth: 0,
            activeBarHeight: 0,
            horizontalLineHeight: 0,
          },
        },
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          paddingRight: "1rem",
          paddingLeft: "1rem",
          backgroundColor: colorBgContainer,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <Logo />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <ThemeSwitcher />

            <Dropdown menu={{ items }} placement="bottomRight" arrow={false}>
              <Avatar
                style={{ verticalAlign: "middle", cursor: "pointer" }}
                size="large"
              >
                {name[0]?.toUpperCase()}
              </Avatar>
            </Dropdown>
          </div>
        </div>
      </Header>
    </ConfigProvider>
  );
}

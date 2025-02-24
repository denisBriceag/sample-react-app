import { ReactElement, useLayoutEffect } from "react";
import { Layout, theme } from "antd";
import { useAuth } from "../../auth/contexts/auth.context.ts";
import { Outlet, useNavigate } from "react-router";
import HeaderComponent from "./header.component.tsx";
import { AppRoutes } from "../../../core/constants/routes.ts";

const { Content } = Layout;

export default function Dashboard(): ReactElement {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useLayoutEffect(() => {
    if (!isLoggedIn()) navigate(AppRoutes.BASE);
  }, [navigate, isLoggedIn]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />

      <article className="flex w-full justify-center">
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            maxWidth: 1000,
            minHeight: "calc(100vh - 94px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </article>
    </Layout>
  );
}

import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./features/dashboard/components/home.component.tsx";
import { lazy, Suspense } from "react";
import SignIn from "./features/auth/components/sign-in.component.tsx";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SignUp from "./features/auth/components/sign-up.component.tsx";
import { AuthProvider } from "./features/auth/providers/auth.provider.tsx";
import ThemeProvider from "./core/providers/theme/theme.provider.tsx";
import LanguageProvider from "./core/providers/language/language.provider.tsx";
import MainContent from "./features/dashboard/components/main-content.component.tsx";
import { AppRoutes } from "./core/constants/routes.ts";
import ErrorProvider from "./core/providers/error/error.provider.tsx";

const Dashboard = lazy(
  () => import("./features/dashboard/components/dashboard.component.tsx"),
);
const AuthPage = lazy(
  () => import("./features/auth/components/auth-page.component.tsx"),
);

export default function App() {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <Suspense
                fallback={
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 96 }} spin />
                    }
                  />
                }
              >
                <Routes>
                  <Route path={AppRoutes.BASE} element={<Home />} />

                  <Route path={AppRoutes.DASHBOARD} element={<Dashboard />}>
                    <Route index element={<MainContent />} />
                  </Route>

                  <Route element={<AuthPage />}>
                    <Route path={AppRoutes.SIGN_IN} element={<SignIn />} />
                    <Route path={AppRoutes.SIGN_UP} element={<SignUp />} />
                  </Route>
                </Routes>
              </Suspense>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
}

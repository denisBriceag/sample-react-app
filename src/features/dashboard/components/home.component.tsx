import { useNavigate } from "react-router";
import { useAuth } from "../../auth/contexts/auth.context.ts";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../../core/components/button.component.tsx";
import { AppRoutes } from "../../../core/constants/routes.ts";

export default function Home(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  function handleClick(): void {
    navigate(isLoggedIn() ? AppRoutes.DASHBOARD : AppRoutes.SIGN_IN);
  }

  return (
    <div className="bg-white h-full">
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl min-h-screen">
          <div className="text-center pt-96">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              {t("home.mainTitle")}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {t("home.mainDesc")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 cursor-pointer">
              <ButtonComponent
                label={
                  isLoggedIn()
                    ? t("home.buttonGetStarted")
                    : t("home.buttonLogin")
                }
                handleClick={handleClick}
                className="rounded-md bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

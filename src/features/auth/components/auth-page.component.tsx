import { Outlet } from "react-router";
import { ReactElement } from "react";
import { useTheme } from "../../../core/providers/theme/theme.context.ts";
import clsx from "clsx";

export default function AuthPage(): ReactElement {
  const { darkMode } = useTheme();

  return (
    <main
      className={clsx(
        darkMode && "bg-[#262626]",
        "w-full",
        "min-h-screen",
        "flex items-center",
        "justify-center",
      )}
    >
      <div className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}

import { ReactElement } from "react";
import { TwitterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Logo(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <TwitterOutlined style={{ fontSize: "1.25rem" }} />

      <h3 className="max-md:hidden">{t("header.logo")}</h3>
    </div>
  );
}

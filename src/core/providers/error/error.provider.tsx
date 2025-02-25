import { ReactElement, useEffect } from "react";
import { WrapperProps } from "../../types/props.type.ts";
import { notification } from "antd";
import { axiosInstance } from "../../axios/axios-instance.ts";
import { useTranslation } from "react-i18next";

export default function ErrorProvider({
  children,
}: WrapperProps): ReactElement {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  useEffect(() => {
    const errorInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        api.error({
          message: t("errors.network.message"),
          description: error.message,
        });
      },
    );

    return () => axiosInstance.interceptors.response.eject(errorInterceptor);
  }, [api, t]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
}

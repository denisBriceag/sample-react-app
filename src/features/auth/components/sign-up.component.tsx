import { useNavigate } from "react-router";
import img from "../../../assets/img.png";
import { useAuth } from "../contexts/auth.context.ts";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, notification } from "antd";
import Validator from "../../../core/utils/validator.util.ts";
import ButtonComponent from "../../../core/components/button.component.tsx";
import clsx from "clsx";
import { useTheme } from "../../../core/providers/theme/theme.context.ts";
import { Roles } from "../../../core/types/roles.enum.ts";

export default function SignUp(): ReactElement {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const { darkMode } = useTheme();

  const [form] = Form.useForm();

  function handleSubmit(): void {
    setLoading(true);

    signUp({ ...form.getFieldsValue(), role: Roles.ADMIN })
      .then(() => (setLoading(false), navigate("/dashboard")))
      .catch(() => requestFailure());
  }

  function handleFieldsChange(): void {
    const hasEmptyFields = Object.values(form.getFieldsValue()).some((v) => !v);
    setDisabled(
      hasEmptyFields ||
        form.getFieldsError().some((field) => field.errors.length > 0),
    );
  }

  function requestFailure(): void {
    setLoading(false);
    api.error({
      message: t("errors.network.message"),
      description: t("errors.network.description"),
    });
  }

  return (
    <>
      {contextHolder}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Grid Dynamics Logo"
            src={img}
            className="mx-auto h-12 w-auto cursor-pointer"
            onClick={() => navigate("../")}
          />

          <h2
            className={clsx(
              darkMode ? "text-white" : "text-gray-900",
              "mt-10",
              "text-center",
              "text-2xl/9",
              "font-bold",
              "tracking-tight",
            )}
          >
            {t("signUp.signUpTitle")}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={handleFieldsChange}
          >
            <Form.Item
              label={t("signUp.signUpName")}
              hasFeedback
              name="name"
              required
              rules={[{ required: true, message: t("validation.required") }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label={t("signIn.signInEmail")}
              hasFeedback
              name="email"
              required
              rules={[
                { required: true, message: t("validation.required") },
                {
                  pattern: Validator.emailRule,
                  message: t("validation.invalidEmail"),
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              hasFeedback
              label={t("signIn.signInPassword")}
              name="password"
              required
              rules={[
                { required: true, message: t("validation.required") },
                { min: 8, message: t("validation.minLength") },
              ]}
            >
              <Input size="large" type="password" />
            </Form.Item>

            <Form.Item
              hasFeedback
              dependencies={["password"]}
              label={t("signUp.signUpConfirmPassword")}
              name="confirmPasssword"
              required
              rules={[
                { required: true, message: t("validation.required") },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();

                    return Promise.reject(
                      new Error(t("validation.passwordShouldMatch")),
                    );
                  },
                }),
              ]}
            >
              <Input size="large" type="password" />
            </Form.Item>

            <Form.Item>
              <ButtonComponent
                style={{ width: "100%" }}
                htmlType="submit"
                label={t("signIn.signInButton")}
                disabled={disabled}
                loading={loading}
                handleClick={handleSubmit}
              />
            </Form.Item>
          </Form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {t("signUp.signUpMessage")}{" "}
            <ButtonComponent
              htmlType="submit"
              variant="link"
              style={{ paddingLeft: 0 }}
              label={t("signUp.signInLink")}
              handleClick={() => navigate("/sign-in")}
            />
          </p>
        </div>
      </div>
    </>
  );
}

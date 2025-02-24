import { CSSProperties, ReactElement, ReactNode } from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";

interface ButtonProps extends BaseButtonProps {
  label: string | number;
  icon?: ReactNode | null;
  handleClick?: () => void;
  disabled?: boolean;
  type?: "default" | "primary" | "dashed" | "link" | "text" | undefined;
  htmlType?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties | undefined;
  loading?: boolean;
}

export default function ButtonComponent({
  color = "primary",
  variant = "solid",
  label = "Click",
  type,
  disabled = false,
  htmlType,
  loading,
  icon,
  handleClick,
  style,
}: ButtonProps): ReactElement {
  return (
    <Button
      htmlType={htmlType}
      color={color}
      variant={variant}
      onClick={handleClick}
      icon={icon}
      type={type}
      style={style}
      disabled={disabled}
      loading={loading}
    >
      {label}
    </Button>
  );
}

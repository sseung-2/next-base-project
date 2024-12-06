import { ReactNode } from "react";
import S from "./styles.module.scss";
import { DownIcon, PlusIcon } from "@icons/index";

type IconType = "DOWNLOAD" | "ADD" | ReactNode;
interface Props {
  type?: "FILL" | "LINE" | "POINT";
  text: string;
  icon?: IconType;
  size?: "S" | "M" | "L";
  submit?: boolean;
  disabled?: boolean;
  customClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  type = "FILL",
  text,
  icon,
  size = "M",
  submit,
  disabled,
  customClass,
  onClick,
}: Props) => {
  const setIcon = (iconType: IconType) => {
    switch (iconType) {
      case "DOWNLOAD":
        return <DownIcon />;
      case "ADD":
        return <PlusIcon />;
      default:
        return iconType;
    }
  };
  return (
    <button
      className={`${S["button"]} ${S[size]} ${S[type]} ${customClass}`}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
    >
      {icon && setIcon(icon)}
      {text}
    </button>
  );
};

export default Button;

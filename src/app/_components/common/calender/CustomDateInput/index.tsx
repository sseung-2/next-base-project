import { CalendarIcon } from "@icons/index";
// import { forwardRef } from "react";
import S from "./styles.module.scss";
import { forwardRef } from "react";

export interface CustomDateInputProps {
  onClick?: () => void;
  value?: string;
  error?: boolean;
  isOpen?: boolean;
  size?: "S" | "M" | "L";
  placeholder?: string;
  hasTime?: boolean;
}
const CustomDateInput = forwardRef(
  ({
    onClick,
    value,
    error,
    isOpen,
    size,
    placeholder,
    hasTime,
  }: CustomDateInputProps) =>
    // ref: any
    {
      return (
        <div
          className={`${S["date-target"]} ${size && S[size]} ${
            error && S["date-error"]
          } ${isOpen ? S["date-open"] : ""}`}
          onClick={onClick}
          // ref={ref}
        >
          <input
            className={hasTime ? S["time"] : ""}
            type="text"
            value={value}
            readOnly
            placeholder={placeholder}
          />
          <CalendarIcon className={S["date-icon"]} />
        </div>
      );
    }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;

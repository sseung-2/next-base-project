import React, { useState, forwardRef } from "react";
import S from "./styles.module.scss";
import { PasswordIcon, EyeIcon, EyeOffIcon, EmailIcon } from "@icons/index";

interface Props {
  option: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

const LoginInput = forwardRef<HTMLInputElement, Props>(
  ({ option, onChange, placeholder, error, errorMessage, ...rest }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const getInputType = () => {
      if (option === "password") {
        return isPasswordVisible ? "text" : "password";
      }
      return "text";
    };

    return (
      <div className={S["input-container"]}>
        <div className={`${S["input-wrapper"]} ${error ? S.error : ""}`}>
          <div className={S["icon-wrapper"]}>
            {option === "password" ? <PasswordIcon /> : <EmailIcon />}
          </div>
          <input
            ref={ref}
            className={`${S.input} ${error ? S["input-error"] : ""}`}
            type={getInputType()}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
          />
          {option === "password" && (
            <button
              type="button"
              className={`${S["toggle-visibility"]} ${error ? S.error : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
        </div>
        {error && <p className={S.errorMessage}>{errorMessage}</p>}
      </div>
    );
  }
);

LoginInput.displayName = "LoginInput";
export default LoginInput;

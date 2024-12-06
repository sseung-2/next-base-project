import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  label: string;
  dir?: "row" | "column";
}
const LabelWrap = ({ label, dir = "row", children }: Props) => {
  return (
    <div className={`${S["wrapper"]} ${S[dir]}`}>
      <div className={S["label"]}>{label}</div>
      {children}
    </div>
  );
};

export default LabelWrap;

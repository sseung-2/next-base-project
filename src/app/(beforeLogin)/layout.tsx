import { ReactNode } from "react";
import S from "./styles.module.scss";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className={S.container}>{children}</div>;
};

export default Layout;

import { PropsWithChildren } from "react";
import S from "./styles.module.scss";
import Header from "../_components/common/header";
import Menu from "../_components/common/menu";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={S["page_wrap"]}>
      <Header />
      <div className={S["content_wrap"]}>
        <Menu />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

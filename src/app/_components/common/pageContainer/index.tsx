import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className={S["page-container"]}>{children}</div>;
};

export default PageContainer;

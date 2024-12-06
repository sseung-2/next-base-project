import { PropsWithChildren } from "react";
import S from "./styles.module.scss";

interface Props extends PropsWithChildren {
  title: string;
}
const PageTitle = ({ title, children }: Props) => {
  return (
    <div className={S["title_wrap"]}>
      <h2 className={S["page_title"]}>{title}</h2>
      {children && <div className={S["handler"]}>{children}</div>}
    </div>
  );
};

export default PageTitle;

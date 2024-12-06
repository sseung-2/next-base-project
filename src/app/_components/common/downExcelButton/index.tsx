import React from "react";
import Button from "../button";

interface Props {
  onClick?: () => void; // 클릭 핸들러
}

const DownExcelButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      text="엑셀 다운"
      type="LINE"
      size="S"
      icon="DOWNLOAD"
      onClick={onClick}
    />
  );
};

export default DownExcelButton;

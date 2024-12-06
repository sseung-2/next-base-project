import { PropsWithChildren } from "react";
import S from "./styles.module.scss";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  onClose: () => void;
}
const PageModal = ({ children, onClose }: Props) => {
  return (
    <>
      <div className={S.pageModalContainer}>{children}</div>
      <div className={S.dimm} onClick={onClose} />
    </>
  );
};

export default PageModal;

interface CommonModalProps {
  title: string;
  content?: string;
  confirmBtn?: string;
  onConfirm?: () => void;
}

interface ConfirmModalProps extends CommonModalProps {
  color?: "blue" | "red";
  cancelBtn?: string;
  onCancel?: () => void;
}

const commonClass = {
  container: S.container,
  popup: S.popup,
  htmlContainer: S.content,
  actions: S.btnWrap,
};

export const Modal = {
  alert: ({
    title,
    content,
    confirmBtn = "확인",
    onConfirm = () => {},
  }: CommonModalProps) => {
    Swal.fire({
      title,
      text: content,
      confirmButtonText: confirmBtn,
      customClass: {
        ...commonClass,
        title: `${S.title} ${!!content ? S.hasContent : ""}`,
        confirmButton: S.confirmBtn,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss) {
        onConfirm();
      }
    });
  },
  confirm: ({
    title,
    content,
    color = "blue",
    confirmBtn = "확인",
    cancelBtn = "취소",
    onConfirm = () => {},
    onCancel = () => {},
  }: ConfirmModalProps) => {
    Swal.fire({
      title,
      text: content,
      showCancelButton: true,
      confirmButtonText: confirmBtn,
      cancelButtonText: cancelBtn,
      customClass: {
        ...commonClass,
        title: `${S.title} ${!!content ? S.hasContent : ""}`,
        confirmButton: color === "blue" ? S.confirmBtn : S.redConfirmBtn,
        cancelButton: S.cancelBtn,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
      }
    });
  },
};

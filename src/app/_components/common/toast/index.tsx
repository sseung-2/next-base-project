import Swal from "sweetalert2";
import S from "./styles.module.scss";

interface ToastProps {
  title: string;
}
const Toast = ({ title }: ToastProps) => {
  return Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconHtml: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0049 7.08333C15.2327 7.31114 15.2327 7.68048 15.0049 7.90829L8.60404 14.3091C8.37768 14.5355 8.0112 14.5371 7.78281 14.3128L4.17459 10.769C3.94474 10.5433 3.94141 10.1739 4.16716 9.94408L4.5759 9.52791C4.80165 9.29806 5.17098 9.29473 5.40083 9.52047L8.18416 12.2541L13.7674 6.67085C13.9952 6.44305 14.3646 6.44305 14.5924 6.67085L15.0049 7.08333Z" fill="white"/>
</svg>`,
    customClass: {
      popup: S.toastContainer,
      icon: S.toastIcon,
      title: S.toastTitle,
      timerProgressBar: S.progressBar,
    },
    showClass: {
      popup: `${S.animated} ${S.fast} ${S.fadeIn}`,
      icon: "",
    },
    hideClass: {
      popup: `${S.animated} ${S.fast} ${S.fadeOut}`,
      icon: "",
    },
  }).fire({ title });
};

export default Toast;

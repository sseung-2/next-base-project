import { ReactNode, useEffect, useRef } from "react";
import S from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

/**
 * 드롭다운 감싸는 컴포넌트
 * @children target(ex.메뉴버튼), drop list(ex.서브메뉴 리스트) 두개가 있으면 됨
 */
const DropDown = ({ isOpen, setIsOpen, children }: Props) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.addEventListener("click", closeDropdown);

      return () => document.body.removeEventListener("click", closeDropdown);
    }
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropRef} className={S.dropContainer}>
      {children}
    </div>
  );
};

export default DropDown;

"use client";

import Link from "next/link";
import { MENU_LIST } from "../../../../constants/menu";
import { usePathname } from "next/navigation";
import { MenuArrowIcon } from "@icons/index";
import { useEffect, useState, useRef } from "react";
import S from "./styles.module.scss";

const Menu = () => {
  const MENU = MENU_LIST;

  const pathname = usePathname();
  const [open, setOpen] = useState<string>("");
  const subMenuRefs = useRef<Record<string, HTMLUListElement | null>>({});

  const handleMenu = (title: string) => {
    const subMenu = subMenuRefs.current[title];

    if (open === title) {
      if (subMenu) {
        subMenu.style.height = `${subMenu.scrollHeight}px`;
        requestAnimationFrame(() => {
          subMenu.style.height = "0px";
        });
      }
      setOpen("");
    } else {
      if (subMenu) {
        subMenu.style.height = "0px";
        requestAnimationFrame(() => {
          const height = subMenu.scrollHeight;
          subMenu.style.height = `${height}px`;
        });
      }

      if (open && subMenuRefs.current[open]) {
        const prevSubMenu = subMenuRefs.current[open];
        if (prevSubMenu) {
          prevSubMenu.style.height = `${prevSubMenu.scrollHeight}px`;
          requestAnimationFrame(() => {
            prevSubMenu.style.height = "0px";
          });
        }
      }

      setOpen(title);
    }
  };

  useEffect(() => {
    const activeMenu = MENU.find((menu) =>
      !!menu.submenu
        ? !!menu.submenu.find(({ path }) => path === pathname)
        : menu.path === pathname
    );
    const activeTitle = activeMenu?.title || "";
    setOpen(activeTitle);

    if (activeTitle && subMenuRefs.current[activeTitle]) {
      const activeSubMenu = subMenuRefs.current[activeTitle];
      if (activeSubMenu) {
        activeSubMenu.style.height = `${activeSubMenu.scrollHeight}px`;
      }
    }
  }, []);

  return (
    <nav className={S.nav}>
      <ul className={S.menuContainer}>
        {MENU.map(({ title, path, submenu }) => {
          const isActive = pathname.startsWith(path) || pathname.includes(path);
          return (
            <li className={S.mainMenu} key={title}>
              {submenu ? (
                <span
                  className={`${S.title} ${open === title ? S.open : ""} ${
                    isActive ? S.active : ""
                  }`}
                  onClick={() => handleMenu(title)}
                >
                  {title}
                  <MenuArrowIcon width={20} />
                </span>
              ) : (
                <Link
                  className={`${S.title} ${isActive ? S.active : ""}`}
                  href={path}
                >
                  {title}
                </Link>
              )}
              {submenu && (
                <ul
                  className={`${S.subMenuList} ${open ? S.open : ""}`}
                  ref={(el) => {
                    if (el) subMenuRefs.current[title] = el;
                  }}
                  style={{
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                  }}
                >
                  {submenu.map(({ title, path }) => {
                    let isActive = false;
                    isActive = pathname.startsWith(path);

                    return (
                      <li
                        className={`${S.subMenu} ${isActive ? S.active : ""}`}
                        key={title}
                      >
                        <Link className={S.subTitle} href={path} prefetch>
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;

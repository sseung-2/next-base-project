"use client";

import Link from "next/link";
import { MENU_LIST } from "../../../../constants/menu";
import { usePathname } from "next/navigation";
import { MenuArrowIcon } from "@icons/index";
import { useEffect, useState } from "react";
import S from "./styles.module.scss";

const Menu = () => {
  const MENU = MENU_LIST;

  const pathname = usePathname();
  const [open, setOpen] = useState<string>("");

  const handleMenu = (title: string) => {
    setOpen(open === title ? "" : title);
  };

  useEffect(() => {
    setOpen(
      MENU.find((menu) =>
        !!menu.submenu
          ? !!menu.submenu.find(({ path }) => path === pathname)
          : menu.path === pathname
      )?.title || ""
    );
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
                  className={`${S.subMenuList} ${open === title ? S.open : ""}`}
                >
                  {submenu.map(({ title, path }) => {
                    let isActive = false;
                    isActive = pathname.startsWith(path);

                    return (
                      <li
                        className={`${S.subMenu} ${isActive ? S.active : ""}`}
                        key={title}
                      >
                        {path === pathname && pathname.includes("/register") ? (
                          <button
                            className={S.subTitle}
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.reload();
                            }}
                          >
                            {title}
                          </button>
                        ) : (
                          <Link className={S.subTitle} href={path} prefetch>
                            {title}
                          </Link>
                        )}
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

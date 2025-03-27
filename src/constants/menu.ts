interface SUB_MENU {
  id: string;
  title: string;
  path: string;
}

interface MENU_ITEM {
  id: string;
  title: string;
  path: string;
  submenu?: SUB_MENU[];
}

export const MENU_LIST: MENU_ITEM[] = [
  {
    id: "digital_card",
    title: "디지털카드 현황",
    path: "/digitalcard",
  },
  {
    id: "scan",
    title: "인증내역",
    path: "/scan",
  },
  {
    id: "banner",
    title: "배너관리",
    path: "/banner",
  },
  {
    id: "user",
    title: "회원관리",
    path: "/user",
  },
];

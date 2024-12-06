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
    id: "sales",
    title: "매출 현황",
    path: "/sales",
  },
  {
    id: "matching",
    title: "인증 현황",
    path: "/matching",
    submenu: [
      {
        id: "all_matching",
        title: "전체 현황",
        path: "/matching/all",
      },
      {
        id: "day_matching",
        title: "일별 현황",
        path: "/matching/day",
      },
    ],
  },
  {
    id: "photocard",
    title: "포토카드 관리",
    path: "/photocard",
  },
];

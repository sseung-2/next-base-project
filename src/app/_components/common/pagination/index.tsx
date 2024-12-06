"use client";

import ReactPaginate from "react-paginate";
import S from "./styles.module.scss";
import { FirstPageIcon, PreviousPageIcon } from "@icons/index";

interface Props {
  count: number;
  pageHandler: ({ selected }: { selected: number }) => void;
  page: number;
  LISTCOUNT?: number;
}

const Pagination = ({ count, pageHandler, page, LISTCOUNT }: Props) => {
  return (
    <div className={S.paginationBox}>
      <div
        onClick={() => pageHandler({ selected: 0 })}
        className={S.firstPageBtn}
      >
        <FirstPageIcon />
      </div>
      <ReactPaginate
        pageCount={Math.ceil(count / (LISTCOUNT ? LISTCOUNT : 10))}
        pageRangeDisplayed={10}
        marginPagesDisplayed={0}
        containerClassName={S.containerClassName}
        breakLabel={""}
        previousLabel={<PreviousPageIcon />}
        nextLabel={<PreviousPageIcon />}
        pageClassName={S.pageClassName}
        activeClassName={S.activeClassName}
        nextClassName={S.nextClassName}
        previousClassName={S.previousClassName}
        onPageChange={pageHandler}
        forcePage={page - 1}
      />
      <div
        onClick={() =>
          pageHandler({
            selected: Math.ceil(count / (LISTCOUNT ? LISTCOUNT : 10)) - 1,
          })
        }
        className={S.lastPageBtn}
      >
        <FirstPageIcon />
      </div>
    </div>
  );
};

export default Pagination;

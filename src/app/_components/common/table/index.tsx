import S from "./styles.module.scss";

interface Column<T> {
  header: string;
  key: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
}

interface TableProps<T extends { [key: string]: React.ReactNode }> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { [key: string]: React.ReactNode }>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <div
      className={`${S["table-container"]} ${
        data?.length && S["no-data-container"]
      }`}
    >
      <table className={S["table"]}>
        <thead className={S["thead"]}>
          <tr>
            {columns.map((column) => (
              <td key={String(column.key)}>{column.header}</td>
            ))}
          </tr>
        </thead>
        <tbody className={S["tbody"]}>
          {!data?.length ? (
            <tr>
              <td colSpan={columns.length} className={S["no-data"]}>
                표시될 내역이 없습니다. 검색어를 다시 입력하세요.
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(row, rowIndex)
                      : row[column.key] || "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

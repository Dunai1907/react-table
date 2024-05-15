import { TableDataRow } from "@/Modules/Form/Form";
import { FC } from "react";
import { Column, useTable } from "react-table";

type DataTableProps = {
  columns: Column<TableDataRow>[];
  tableData: TableDataRow[];
};
const DataTable: FC<DataTableProps> = (props) => {
  const { columns, tableData } = props;
  console.log("columns <-------", columns);
  console.log("tableData <-------", tableData);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;

import { useEffect, useMemo, useState } from "react";
import SpecApi from "@/Api/spec";
import {
  Column,
  SortByFn,
  useSortBy,
  useTable,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { Container, Box, Stack, Button } from "@mui/material";
import { formatDateToMonth } from "@/utils/helpers";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";
import { GlobalFilter } from "./Components/Filters/Filters";
import { useNavigate } from "react-router-dom";
import { RouteUrls } from "@/Routes/Router";

export type TableData = {
  f_pers_young_spec_id?: number;
  insert_date: string | Date;
  insert_user: string;
  org_employee: string;
  rep_beg_period: string;
  rep_end_period: string;
  update_date: string | Date;
  update_user: string;
  period?: string;
  year?: string;
};

interface Row {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const sortTypes: Record<string, SortByFn<TableData>> = {
  string: (rowA, rowB, columnId) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string
    ];

    return a.localeCompare(b, "en");
  },
};

const tableColumns: Column<TableData>[] = [
  {
    Header: "ЗА ПЕРИОД",
    accessor: (el) => {
      const startMonth = formatDateToMonth(el.rep_beg_period);
      const endMonth = formatDateToMonth(el.rep_end_period);
      return startMonth === endMonth
        ? startMonth
        : `${startMonth} - ${endMonth}`;
    },
    filter: "text",
  },
  {
    Header: "ГОД",
    accessor: (el) => `${el.rep_end_period.split("-")[0]}`,
    disableFilters: true,
  },
  {
    Header: "ОРГАНИЗАЦИЯ",
    accessor: "insert_user",
    disableFilters: true,
  },
];

const Table = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TableData[]>([]);
  const columns = useMemo(() => tableColumns, []);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  const tableInstance = useTable(
    {
      columns,
      data,
      sortTypes,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );
  const spec = new SpecApi();

  useEffect(() => {
    const getData = async () => {
      const data: TableData[] = await spec.getTables();
      setData(data);
    };
    getData();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  const selectTable = (row: Row) => {
    setSelectedRow(row);
    localStorage.setItem("formId", row.original.f_pers_young_spec_id);
  };

  return (
    <Container component="main" fixed>
      <Stack
        sx={{
          marginTop: 3,
          alignItems: "center",
        }}
        spacing={2}
        direction="row"
      >
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button variant="outlined" onClick={() => navigate(RouteUrls.form)}>
          ДОБАВИТЬ
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(RouteUrls.viewTable)}
        >
          ПРОСМОТРЕТЬ
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            console.log("РЕДАКТИРОВАТЬ <-------");
          }}
        >
          РЕДАКТИРОВАТЬ
        </Button>
      </Stack>
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid black",
        }}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.canSort && (
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BiSortUp />
                          ) : (
                            <BiSortDown />
                          )
                        ) : (
                          <BiSortAlt2 />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  onClick={() => selectTable(row)}
                  style={{
                    border: "1px solid black",
                    backgroundColor:
                      selectedRow === row ? "lightgray" : "white",
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{ border: "1px solid black" }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Container>
  );
};

export default Table;

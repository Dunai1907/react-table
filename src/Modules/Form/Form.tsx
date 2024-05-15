import {
  useEffect,
  useState,
  useMemo,
  FC,
  ChangeEvent,
  FormEvent,
} from "react";
import SpecApi from "@/Api/spec";
import {
  Container,
  Box,
  TextField,
  FormControlLabel,
  Button,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
} from "@mui/material";
import { USER, months } from "@/constants/constants";
import { Column, ColumnInstance, Row } from "react-table";
import { TableData } from "../Table/Table";
import { formattedMonthToFullDate } from "@/utils/helpers";
import DataTable from "@/Components/Table/DataTable";

export type TableDataRow = {
  f_pers_young_spec_id?: number;
  nsi_pers_young_spec_id?: number;
  nsi_pers_indicate_id?: number;
  actual_date?: string;
  name?: string;
  range?: number;
  update_date: string | Date;
  update_user: string;
  total?: number;
  target_count?: number;
  distribution_count?: number;
  rep_beg_period?: string;
  rep_end_period?: string;
  insert_user?: string;
  org_employee?: string;
};

const Form: FC = () => {
  const spec = new SpecApi();
  const [year, setYear] = useState("2024");
  const [changeMonths, setChangeMonths] = useState<string[]>(["Январь"]);
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [basicData, setBasicData] = useState<TableData>({} as TableData);

  useEffect(() => {
    const create = async () => {
      const data = await spec.getLinesInfo();
      setTableData(data);
    };
    create();
  }, []);

  useEffect(() => {
    const endPeriod = formattedMonthToFullDate(changeMonths[0] as string, year);
    const newData = { ...basicData };
    newData.rep_beg_period = `${year}-01-01`;
    newData.rep_end_period = endPeriod;
    setBasicData(newData);
  }, [year]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTableChange = (
    rowIndex: number,
    columnId: string,
    value: number
  ) => {
    const newData = [...tableData];
    newData[rowIndex][columnId] = value;
    newData.forEach((row) => {
      const distributionCount =
        typeof row.distribution_count !== "undefined"
          ? row.distribution_count
          : 0;
      const targetCount =
        typeof row.target_count !== "undefined" ? row.target_count : 0;
      const sum = distributionCount + targetCount;
      row.total = sum;
    });
    setTableData(newData);
  };

  const handleChangeMonth = (event: SelectChangeEvent<typeof months>) => {
    const {
      target: { value },
    } = event;

    const endPeriod = formattedMonthToFullDate(value as string, year);
    const newData = { ...basicData };
    newData.rep_beg_period = `${year}-01-01`;
    newData.rep_end_period = endPeriod;
    setBasicData(newData);
    setChangeMonths(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleChangeOrganizationData = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newData = { ...basicData };
    newData.org_employee = event.target.value;
    setBasicData(newData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    for (const [name, value] of formData) {
      console.log(`${name}: ${value}`);
    }

    const dataTables = await spec.createTable({
      insert_date: new Date(),
      insert_user: USER,
      org_employee: basicData.org_employee,
      rep_beg_period: basicData.rep_beg_period,
      rep_end_period: basicData.rep_end_period,
      update_date: new Date(),
      update_user: USER,
    });

    tableData.forEach(async (data) => {
      await spec.createDataInfo({
        f_pers_young_spec_id: dataTables.f_pers_young_spec_id,
        nsi_pers_indicate_id: data.nsi_pers_young_spec_id,
        update_date: data.update_date,
        update_user: data.update_user,
        target_count: data.target_count,
        distribution_count: data.distribution_count,
      });
    });
  };

  const columns: Column<TableDataRow>[] = useMemo(
    () => [
      {
        Header: "Наименование показателя",
        accessor: "name",
      },
      {
        Header: "Общее колличество молодых специалистов",
        accessor: "total" as keyof TableDataRow,
        Cell: ({
          row,
          column,
        }: {
          row: Row<TableDataRow>;
          column: ColumnInstance<TableDataRow>;
        }) => (
          <TextField
            disabled
            size="small"
            type="number"
            defaultValue={0}
            value={tableData[row.index][column.id as keyof TableDataRow]}
            onChange={(e) =>
              handleTableChange(row.index, column.id, +e.target.value)
            }
          />
        ),
      },
      {
        Header: "Категория, источник приема на работу",
        columns: [
          {
            Header: "целевое",
            accessor: "target_count" as keyof TableDataRow,
            Cell: ({
              row,
              column,
            }: {
              row: Row<TableDataRow>;
              column: ColumnInstance<TableDataRow>;
            }) => (
              <TextField
                size="small"
                type="number"
                defaultValue={0}
                value={tableData[row.index][column.id as keyof TableDataRow]}
                onChange={(e) =>
                  handleTableChange(row.index, column.id, +e.target.value)
                }
              />
            ),
          },
          {
            Header: "распределение",
            accessor: "distribution_count" as keyof TableDataRow,
            Cell: ({
              row,
              column,
            }: {
              row: Row<TableDataRow>;
              column: ColumnInstance<TableDataRow>;
            }) => (
              <TextField
                size="small"
                type="number"
                defaultValue={0}
                value={tableData[row.index][column.id as keyof TableDataRow]}
                onChange={(e) =>
                  handleTableChange(row.index, column.id, +e.target.value)
                }
              />
            ),
          },
        ],
      },
    ],
    [tableData]
  );

  return (
    <Container component="main" fixed>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid black",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          // noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <FormControl
              sx={{
                m: 1,
                alignItems: "start",
                minWidth: 550,
                gap: "10px",
              }}
              size="small"
            >
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Select
                    name="month"
                    sx={{
                      minWidth: 350,
                    }}
                    value={changeMonths}
                    onChange={handleChangeMonth}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                }
                label="За период ЯНВАРЬ - "
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                minWidth: 550,
                backgroundImage: "url(public/calendar.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
              }}
              size="small"
            >
              <Select name="year" value={year} onChange={handleChangeYear}>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem selected={true} value={2023}>
                  2023
                </MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              sx={{ alignItems: "start" }}
              labelPlacement="top"
              control={
                <TextField
                  fullWidth
                  id="text"
                  name="text"
                  autoComplete="text"
                  autoFocus
                  onChange={handleChangeOrganizationData}
                />
              }
              label="Ответственный заполнивший форму (ФИО, должность, телефон)"
            />
          </FormGroup>
          <DataTable columns={columns} tableData={tableData} />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "min-content",
              display: "flex",
              marginLeft: "auto",
              mt: 3,
              mb: 2,
            }}
          >
            Закрыть
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;

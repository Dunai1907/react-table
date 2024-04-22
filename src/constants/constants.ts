export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const myColumns = [
  {
    Header: "Наименование показателя",
    accessor: "name",
  },
  {
    Header: "Общее колличество молодых специалистов",
    accessor: "count",
  },
  {
    Header: "Категория, источник приема на работу",
    columns: [
      {
        Header: "целевое",
        accessor: "firstName",
      },
      {
        Header: "распределение",
        accessor: "lastName",
      },
    ],
  },
];

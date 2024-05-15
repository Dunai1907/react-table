const monthNames: string[] = [
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

export function formatDateToMonth(dateString: string): string {
  const dateParts: string[] = dateString.split("-");
  const monthNumber: number = parseInt(dateParts[1], 10) - 1;

  return monthNames[monthNumber];
}

export function formattedMonthToFullDate(month: string, year: string) {
  const monthIndex = monthNames.indexOf(month);
  if (monthIndex === -1) {
    return "Неверно указан месяц";
  }
  const monthNumber = monthIndex + 1;
  const lastDay = new Date(+year, monthNumber, 0).getDate();
  const formattedDate =
    year +
    "-" +
    (monthNumber < 10 ? "0" + monthNumber : monthNumber) +
    "-" +
    lastDay;

  return formattedDate;
}

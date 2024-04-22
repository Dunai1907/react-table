export function formatDateToMonth(dateString: string): string {
  const dateParts: string[] = dateString.split("-");
  const monthNumber: number = parseInt(dateParts[1], 10) - 1;

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

  return monthNames[monthNumber];
}

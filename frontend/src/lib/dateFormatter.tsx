export function dateFomatter(formatDate: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    formatDate
  );
  return formattedDate;
}

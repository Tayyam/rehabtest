export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Return the formatted date
  return `${day}/${month}/${year}`;
}

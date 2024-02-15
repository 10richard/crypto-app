export default function getTodayDateTime() {
  const date = new Date();
  const formatDate = date.toLocaleDateString("en", {
    month: "2-digit",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return formatDate.replace(",", "");
}

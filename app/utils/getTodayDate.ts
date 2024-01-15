export default function getTodayDate() {
  const date = new Date();
  const formatDate = date.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return formatDate;
}

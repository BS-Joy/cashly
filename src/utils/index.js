export const formatDateTime = (isoDate) => {
  if (!isoDate) return "Not available";

  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

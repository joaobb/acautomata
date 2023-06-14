import { format } from "date-fns";

function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy");
}

function formatDateTime(date: Date) {
  return {
    date: format(date, "dd/MM/yyyy"),
    time: format(date, "H:mm"),
  };
}

export { formatDate, formatDateTime };

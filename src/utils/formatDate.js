import { format } from "date-fns";

function formatDate(date) {
  return format(date, "dd/MM/yyyy");
}

function formatDateTime(date) {
  return {
    date: format(date, "dd/MM/yyyy"),
    time: format(date, "H:mm"),
  };
}

export { formatDate, formatDateTime };

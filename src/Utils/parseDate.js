import { format, parseISO } from "date-fns"

const parseDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd/MM/yyyy");
}

export default parseDate;
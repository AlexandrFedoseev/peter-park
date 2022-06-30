export function dateComparator(dateAsString1: string, dateAsString2: string): -1 | 0 | 1 {
    // // In the application, dates are stored as yyyy-mm-dd
    let dateParts = dateAsString1.split("-");
    let day = Number(dateParts[2]);
    let month = Number(dateParts[1]) - 1;
    let year = Number(dateParts[0]);
    const date1 = new Date(year, month, day);
    dateParts = dateAsString2.split("-");
    day = Number(dateParts[2]);
    month = Number(dateParts[1]) - 1;
    year = Number(dateParts[0]);
    const date2 = new Date(year, month, day)
    if (date2 < date1) {
        return -1;
    } else if (date2 > date1) {
        return 1;
    }
    return 0;
}

const FormUtils = {
    dateComparator
}
export default FormUtils
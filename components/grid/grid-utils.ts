export function textMatcher ({ filter, value, filterText }): boolean {
  const filterTextLowerCase = filterText.toLowerCase()
  const valueLowerCase = value.toString().toLowerCase()
  const index = valueLowerCase.lastIndexOf(filterTextLowerCase)
  switch (filter) {
    case 'contains':
      return valueLowerCase.includes(filterTextLowerCase)
    case 'notContains':
      return !valueLowerCase.includes(filterTextLowerCase)
    case 'equals':
      return valueLowerCase === filterTextLowerCase
    case 'notEqual':
      return valueLowerCase !== filterTextLowerCase
    case 'startsWith':
      return valueLowerCase.indexOf(filterTextLowerCase) === 0
    case 'endsWith':
      return (
        index >= 0 &&
        index === valueLowerCase.length - filterTextLowerCase.length
      )
    default:
      return false
  }
}

export function dateComparator (filterLocalDateAtMidnight: Date, cellValue: string): -1 | 0 | 1 {
  const dateAsString = cellValue
  if (dateAsString == null) { return 0 }
  // In the application, dates are stored as mm/dd/yyyy
  const dateParts = dateAsString.split('/')
  const day = Number(dateParts[1])
  const month = Number(dateParts[0]) - 1
  const year = Number(dateParts[2])
  const cellDate = new Date(year, month, day)
  if (cellDate < filterLocalDateAtMidnight) {
    return -1
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1
  }
  return 0
}
const GridUtils = {
  textMatcher, dateComparator
}
export default GridUtils

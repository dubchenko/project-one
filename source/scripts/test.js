const MS_IN_YEAR = 31536000000
const MS_IN_LEAP_YEAR = 31622400000
const MS_IN_AVG_YEAR = (3 * MS_IN_YEAR + MS_IN_LEAP_YEAR) / 4

export function test () {
  return 1
}

export function caclInterval ({ currentDate, dateOfBirth }) {
  const differenceInMs = currentDate - new Date(dateOfBirth)

  const fullYearsAndMillisecond = (differenceInMs / MS_IN_AVG_YEAR)
    .toFixed(9)
    .toString()
    .split('.')

  return {
    years: +fullYearsAndMillisecond[0],
    millisecond: +fullYearsAndMillisecond[1]
  }
}

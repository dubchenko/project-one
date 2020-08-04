export function caclInterval ({ currentDate, dateOfBirth }) {
  let currentYear = currentDate.getFullYear()
  const birthYear = dateOfBirth.getFullYear()

  dateOfBirth.setFullYear(currentYear)

  if (dateOfBirth > currentDate) {
    dateOfBirth.setFullYear(currentYear -= 1)
  }

  const nextDateOfBirth = new Date(dateOfBirth).setFullYear(currentYear + 1)

  const fullYearsAndMillisecond = ((currentYear - birthYear) +
    (currentDate - dateOfBirth) / (nextDateOfBirth - dateOfBirth))
    .toFixed(9)
    .toString()
    .split('.')

  return {
    years: fullYearsAndMillisecond[0],
    millisecond: fullYearsAndMillisecond[1]
  }
}

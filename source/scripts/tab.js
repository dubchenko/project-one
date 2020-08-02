document.addEventListener('DOMContentLoaded', async () => {
  const currentYear = new Date().getFullYear()

  const startOfCurrentYear = new Date(currentYear, 0, 1)
  const startOfNextYear = new Date(currentYear + 1, 0, 1)
  const millisecondsInCurrentYear = startOfNextYear - startOfCurrentYear

  console.log('millisecondsInCurrentYear', millisecondsInCurrentYear)

  startLoop({ millisecondsInCurrentYear })
})

function startLoop ({ millisecondsInCurrentYear }) {
  const dob = new Date(1996, 2, 14)

  console.log('dob', dob)

  loop({ dob, millisecondsInCurrentYear })

  setInterval(() => {
    loop({ dob, millisecondsInCurrentYear })
  }, 10)
}

function loop ({ dob, millisecondsInCurrentYear }) {
  const now = new Date()

  const difference = now - dob
  const fullYears = difference / millisecondsInCurrentYear
  const fullYearsAndMillisecond = fullYears.toFixed(9).toString().split('.')

  render({
    years: fullYearsAndMillisecond[0],
    millisecond: fullYearsAndMillisecond[1]
  })
}

function render ({ years, millisecond }) {
  const yearsEl = document.getElementById('years')
  const millisecondEl = document.getElementById('millisecond')

  if (!yearsEl || !millisecondEl) {
    return
  }

  yearsEl.innerText = years
  millisecondEl.innerText = millisecond
}

import browser from 'webextension-polyfill'

document.addEventListener('DOMContentLoaded', async () => {
  init()
})

async function init () {
  // browser.storage.sync.clear()

  const currentYear = new Date().getFullYear()

  const startOfCurrentYear = new Date(currentYear, 0, 1)
  const startOfNextYear = new Date(currentYear + 1, 0, 1)
  const millisecondsInCurrentYear = startOfNextYear - startOfCurrentYear

  const { dateOfBirth } = await browser.storage.sync.get()

  if (!dateOfBirth) {
    try {
      const value = await showPrompt()

      const dateParts = value
        .split('-')
        .map(i => +i)

      const dateOfBirth = `${new Date(dateParts[0], dateParts[1] - 1, dateParts[2])}`

      browser.storage.sync.set({
        dateOfBirth
      })

      startLoop({ dateOfBirth, millisecondsInCurrentYear })
    } catch (e) {
      console.log(e)
    }

    return
  }

  startLoop({ dateOfBirth, millisecondsInCurrentYear })
}

function startLoop ({ dateOfBirth, millisecondsInCurrentYear }) {
  loop({ dateOfBirth, millisecondsInCurrentYear })

  setInterval(() => {
    loop({ dateOfBirth, millisecondsInCurrentYear })
  }, 10)
}

function loop ({ dateOfBirth, millisecondsInCurrentYear }) {
  const now = new Date()

  const difference = now - new Date(dateOfBirth)
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
  millisecondEl.innerText = `.${millisecond}`
}

function showPrompt () {
  const modal = document.getElementById('modal')
  const form = document.forms.dateOfBirthForm

  modal.classList.remove('hidden')

  return new Promise((resolve, reject) => {
    form.onsubmit = function () {
      const dot = form.dateOfBirth.value

      if (!dot) {
        return false
      }

      modal.classList.add('hidden')

      resolve(dot)

      return false
    }
  })
}

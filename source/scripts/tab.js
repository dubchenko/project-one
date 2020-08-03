import browser from 'webextension-polyfill'
import { test } from './test.js'

const MS_IN_YEAR = 31536000000
const MS_IN_LEAP_YEAR = 31622400000
const MS_IN_AVG_YEAR = (3 * MS_IN_YEAR + MS_IN_LEAP_YEAR) / 4

document.addEventListener('DOMContentLoaded', async () => {
  init()
  console.log(test())
})

async function init () {
  // browser.storage.sync.clear()

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

      startLoop({ dateOfBirth })
    } catch (e) {
      console.log(e)
    }

    return
  }

  startLoop({ dateOfBirth })
}

function startLoop ({ dateOfBirth }) {
  loop({ dateOfBirth })

  setInterval(() => {
    loop({ dateOfBirth })
  }, 85)
}

export function loop ({ currentDate = new Date(), dateOfBirth }) {
  const differenceInMs = currentDate - new Date(dateOfBirth)

  const fullYearsAndMillisecond = (differenceInMs / MS_IN_AVG_YEAR)
    .toFixed(9)
    .toString()
    .split('.')

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

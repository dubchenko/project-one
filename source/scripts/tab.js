import browser from 'webextension-polyfill'
import { caclInterval } from './interval.js'

document.addEventListener('DOMContentLoaded', async () => {
  init()
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
  }, 50)
}

function loop ({ dateOfBirth }) {
  const { years, millisecond } = caclInterval({
    currentDate: new Date(),
    dateOfBirth: new Date(dateOfBirth)
  })

  render({
    years,
    millisecond
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

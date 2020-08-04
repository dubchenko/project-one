import browser from 'webextension-polyfill'
import { caclInterval } from './interval.js'

const colorModes = {
  light: {
    text: '#000',
    background: '#fff',
    primary: 'hsl(240, 100%, 57%)',
    secondary: 'hsl(260, 100%, 57%)',
    accent: 'hsl(280, 100%, 57%)',
    muted: '#f9f9fc',
    gray: '#555'
  },
  black: {
    text: '#fff',
    background: '#000',
    primary: '#0ff',
    secondary: '#0fc',
    accent: '#f0f',
    muted: '#111',
    gray: '#888'
  },
  dark: {
    text: '#fff',
    background: 'hsl(180, 5%, 15%)',
    primary: 'hsl(180, 100%, 57%)',
    secondary: 'hsl(50, 100%, 57%)',
    accent: 'hsl(310, 100%, 57%)',
    muted: 'hsl(180, 5%, 5%)',
    gray: 'hsl(180, 0%, 70%)'
  },
  deep: {
    text: '#fff',
    background: 'hsl(230,25%,18%)',
    primary: 'hsl(260, 100%, 80%)',
    secondary: 'hsl(290, 100%, 80%)',
    highlight: 'hsl(260, 20%, 40%)',
    accent: 'hsl(290, 100%, 80%)',
    muted: 'hsla(230, 20%, 0%, 20%)',
    gray: 'hsl(210, 50%, 60%)'
  },
  hack: {
    text: 'hsl(120, 100%, 75%)',
    background: 'hsl(120, 20%, 10%)',
    primary: 'hsl(120, 100%, 40%)',
    secondary: 'hsl(120, 50%, 40%)',
    accent: 'hsl(120, 100%, 90%)',
    muted: 'hsl(120, 20%, 7%)',
    gray: 'hsl(120, 20%, 40%)'
  },
  pink: {
    text: 'hsl(350, 80%, 10%)',
    background: 'hsl(350, 100%, 90%)',
    primary: 'hsl(350, 100%, 50%)',
    secondary: 'hsl(280, 100%, 50%)',
    accent: 'hsl(280, 100%, 20%)',
    muted: 'hsl(350, 100%, 88%)',
    gray: 'hsl(350, 40%, 50%)'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

async function init () {
  // browser.storage.sync.clear()

  const { dateOfBirth } = await browser.storage.sync.get()
  const { colorMode } = await browser.storage.local.get()

  setColorMode(colorMode)

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

  const colorModeButton = document.getElementById('colorMode')

  colorModeButton.addEventListener('click', async () => {
    const modes = Object.keys(colorModes)

    let { colorMode } = await browser.storage.local.get()

    if (!colorMode) {
      colorMode = modes[0]
    }

    const currentColorModeIndex = modes.indexOf(colorMode)

    const nextColorModeIndex = (currentColorModeIndex + 1) % modes.length

    browser.storage.local.set({
      colorMode: modes[nextColorModeIndex]
    })

    setColorMode(modes[nextColorModeIndex])
  })
}

function setColorMode (mode) {
  const documentElement = document.documentElement

  const colors = colorModes[mode]

  for (const color in colors) {
    documentElement.style.setProperty(`--${color}`, colors[color])
  }
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

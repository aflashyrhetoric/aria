const hsl = require('hsl-to-hex') // import the script
import { alphabet } from './vars'

export const randomNumber = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const randomLetter = () => {
  const randomNumber = Math.floor(Math.random() * 26)
  return alphabet.lower[randomNumber]
}

export const randomLetterN = n => {
  let letters = []
  for (let i = 0; i < n; i++) {
    letters.push(randomLetter())
  }
  return letters
}

export function randomColor() {
  const hue = randomNumber(360)
  const saturation = 75
  const luminosity = 84
  return hsl(hue, saturation, luminosity)
}

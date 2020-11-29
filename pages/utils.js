import { alphabet } from './vars'

export const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

export const randomLetter = () => {
  const randomNumber = Math.floor(Math.random() * 26)
  return alphabet.lower[randomNumber]
}

export const randomLetterN = (n) => {
  let letters = []
  for (let i = 0; i < n; i++) {
    letters.push(randomLetter())
  }
  return letters
}

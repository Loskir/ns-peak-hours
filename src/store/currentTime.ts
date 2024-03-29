import { atom, onMount } from 'nanostores'

export const $currentTime = atom<number>(Date.now())

onMount($currentTime, () => {
  $currentTime.set(Date.now())
  const updating = setInterval(() => {
    $currentTime.set(Date.now())
  }, 100)
  return () => {
    clearInterval(updating)
  }
})

import { atom } from 'nanostores'
import { subscribeEverySecond } from '../lib/subscribeEverySecond'

export const $currentDate = atom<number>(Date.now())

export const updateDate = (ms: number) => {
  $currentDate.set(ms)
}

export const setupUpdateEverySecond = () => subscribeEverySecond(updateDate)

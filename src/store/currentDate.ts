import { atom } from 'nanostores'
import { subscribeEverySecond } from '../lib/subscribeEverySecond'

export const $currentDate = atom<number>(Date.now())

export const updateDate = () => {
  $currentDate.set(Date.now())
}

export const setupUpdateEverySecond = () => subscribeEverySecond(updateDate)

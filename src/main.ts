import {
  setupUpdateEverySecond as setupUpdateCurrentDateEverySecond,
} from './store/currentDate.ts'
import { isPeakHours as $isPeakHours } from './store/isPeakHours.ts'

$isPeakHours.subscribe((isPeakHours) => {
  const el = document.querySelector('body')
  if (el) {
    if (isPeakHours) {
      el.classList.add('peak')
    } else {
      el.classList.remove('peak')
    }
  }
})

setupUpdateCurrentDateEverySecond()

import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
})

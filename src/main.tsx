import {
  setupUpdateEverySecond as setupUpdateCurrentDateEverySecond,
} from './store/currentDate.ts'
import { $isPeakHours } from './store/isPeakHours.ts'

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

import { render } from 'preact'
import { App } from './app.tsx'

render(<App />, document.getElementById('app')!)

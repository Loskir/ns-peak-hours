/* @refresh reload */
import { render } from 'solid-js/web'
import { setupUpdateEverySecond as setupUpdateCurrentDateEverySecond } from './store/currentDate.ts'
import { $isPeakHours } from './store/isPeakHours.ts'
import { App } from './App'

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

render(() => <App />, document.getElementById('app')!)

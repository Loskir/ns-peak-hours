import {
  $currentDate,
  setupUpdateEverySecond as setupUpdateCurrentDateEverySecond,
} from './store/currentDate.ts'
import { $isPeakHours, $nextChangeAt } from './store/isPeakHours.ts'
import { $countdown } from './store/countdown.ts'

// const render = () => {
//   console.log('render')
//   const date = new Date()
//   const result = isPeakHours(date)
//   document.querySelector<HTMLDivElement>('#app')!.innerHTML = (
//     <>
//       <p>Date: {date}</p>
//       <p>
//         Is peak: {result.isPeakHours ? 'yes' : 'no'}, next change:{' '}
//         {result.nextChangeAt}
//       </p>
//     </>
//   ) as string
// }
$currentDate.subscribe((date) => {
  const el = document.querySelector('#date')
  if (el) el.innerHTML = new Date(date).toLocaleString()
})
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
$isPeakHours.subscribe((isPeakHours) => {
  const el = document.querySelector('#isPeak')
  if (el) el.innerHTML = isPeakHours ? 'yes' : 'no'
})
$isPeakHours.subscribe((isPeakHours) => {
  const el = document.querySelector('#peakHoursEnd')
  if (el) el.innerHTML = isPeakHours ? 'end' : 'start'
})
$nextChangeAt.subscribe((nextChangeAt) => {
  const el = document.querySelector('#nextChange')
  if (el) el.innerHTML = new Date(nextChangeAt).toLocaleString()
})
$countdown.subscribe((value) => {
  const el = document.querySelector('#countdown')
  if (el) el.innerHTML = value
})

setupUpdateCurrentDateEverySecond()

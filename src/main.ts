import { $currentTime } from './store/currentTime'
import { $isPeakHours, $nextChangeAt } from './store/isPeakHours'
import { $countdown } from './store/countdown'
import { isPeakHours } from './lib/isPeakHours/isPeakHours'

$currentTime.subscribe((currentTime) => {
  const el = document.querySelector('#date')
  if (el) el.innerHTML = new Date(currentTime).toLocaleString()
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

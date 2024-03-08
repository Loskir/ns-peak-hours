import { computed } from 'nanostores'
import { nextChangeAt } from './isPeakHours'
import { currentDate } from './currentDate'
import { formatDuration } from '../lib/formatDuration/formatDuration'

export const countdown = computed(
  [nextChangeAt, currentDate],
  (nextChangeAtRaw, currentDateRaw) => {
    return formatDuration(new Date(currentDateRaw), new Date(nextChangeAtRaw))
  },
)

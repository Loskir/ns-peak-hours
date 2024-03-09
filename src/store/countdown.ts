import { computed } from 'nanostores'
import { $nextChangeAt } from './isPeakHours'
import { $currentTime } from './currentTime'
import { formatDuration } from '../lib/formatDuration/formatDuration'

export const $countdown = computed(
  [$nextChangeAt, $currentTime],
  (nextChangeAtRaw, currentTimeRaw) => {
    return formatDuration(new Date(currentTimeRaw), new Date(nextChangeAtRaw))
  },
)

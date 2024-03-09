import { computed } from 'nanostores'
import { $currentTime } from './currentTime'
import { isPeakHours } from '../lib/isPeakHours/isPeakHours'

const $isPeakHoursRaw = computed($currentTime, (date) => isPeakHours(new Date(date)))

export const $isPeakHours = computed($isPeakHoursRaw, ({isPeakHours}) => isPeakHours)
export const $nextChangeAt = computed($isPeakHoursRaw, ({nextChangeAt}) => nextChangeAt.getTime())

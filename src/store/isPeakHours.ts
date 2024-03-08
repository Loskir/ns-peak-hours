import { computed } from 'nanostores'
import { $currentDate } from './currentDate'
import { isPeakHours } from '../lib/isPeakHours/isPeakHours'

const $isPeakHoursRaw = computed($currentDate, (date) => isPeakHours(new Date(date)))

export const $isPeakHours = computed($isPeakHoursRaw, ({isPeakHours}) => isPeakHours)
export const $nextChangeAt = computed($isPeakHoursRaw, ({nextChangeAt}) => nextChangeAt.getTime())

import { computed } from "nanostores";
import { $nextChangeAt } from "./isPeakHours";
import { $currentDate } from "./currentDate";
import { DateTime } from "luxon";

export const $countdown = computed([$nextChangeAt, $currentDate], (nextChangeAt, currentDate) => {
  const nextChangeAtLux = DateTime.fromMillis(nextChangeAt)
  const currentDateLux = DateTime.fromMillis(currentDate)
  const interval = nextChangeAtLux.diff(currentDateLux)
  if (!interval.isValid) {
    throw new Error('invalid interval')
  }
  if (interval.days >= 1) {
    // todo
    return `${interval.as('day')} days`
  }
  return interval.toFormat('hh:mm:ss')
  // return interval.toString()
  return 'soon'
})
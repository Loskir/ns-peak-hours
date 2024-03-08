import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const isPeakHours = (
  dateRaw: Date,
): {
  isPeakHours: boolean
  nextChangeAt: Date
} => {
  // Rules for peak: Weekdays at 6:30—9:00, 16:00—18:30
  // Rules for weekend: Friday 18:30 — Monday 4:00
  // So Monday 4:00 — 6:30 is Off-Peak, but not Weekend
  const date = dayjs(dateRaw).tz('Europe/Amsterdam')
  let time0630 = date
    .set('hour', 6)
    .set('minute', 30)
    .set('second', 0)
    .set('millisecond', 0)
  let time0900 = date
    .set('hour', 9)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
  let time1600 = date
    .set('hour', 16)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
  let time1830 = date
    .set('hour', 18)
    .set('minute', 30)
    .set('second', 0)
    .set('millisecond', 0)
  let time0630NextWeek = date
    .startOf('day')
    // I HATE WEEKDAYS STARTING FROM SUNDAY
    .subtract((date.day() + 6) % 7, 'day')
    .add(7, 'day')
    .set('hour', 6)
    .set('minute', 30)
    .set('second', 0)
    .set('millisecond', 0)
  let time0630Tomorrow = date
    .startOf('day')
    .add(1, 'day')
    .set('hour', 6)
    .set('minute', 30)
    .set('second', 0)
    .set('millisecond', 0)
  if (date.day() === 0 || date.day() === 6) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek.toDate(),
    }
  }
  if (date < time0630) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630.toDate(),
    }
  }
  if (date >= time0630 && date < time0900) {
    return {
      isPeakHours: true,
      nextChangeAt: time0900.toDate(),
    }
  }
  if (date >= time0900 && date < time1600) {
    return {
      isPeakHours: false,
      nextChangeAt: time1600.toDate(),
    }
  }
  if (date >= time1600 && date < time1830) {
    return {
      isPeakHours: true,
      nextChangeAt: time1830.toDate(),
    }
  }
  // if (date >= time1830)

  // if it's Friday
  if (date.day() === 5) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek.toDate(),
    }
  }
  return {
    isPeakHours: false,
    nextChangeAt: time0630Tomorrow.toDate(),
  }
}

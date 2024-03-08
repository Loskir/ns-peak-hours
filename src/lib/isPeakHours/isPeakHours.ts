import { addDay, dayStart, tzDate, weekStart } from '@formkit/tempo'

export const isPeakHours = (
  dateRaw: Date,
): {
  isPeakHours: boolean
  nextChangeAt: Date
} => {
  // Rules for peak: Weekdays at 6:30—9:00, 16:00—18:30
  // Rules for weekend: Friday 18:30 — Monday 4:00
  // So Monday 4:00 — 6:30 is Off-Peak, but not Weekend
  const date = tzDate(dateRaw, 'Europe/Amsterdam')
  const time0630 = new Date(date)
  time0630.setHours(6, 30, 0, 0)
  const time0900 = new Date(date)
  time0900.setHours(9, 0, 0, 0)
  const time1600 = new Date(date)
  time1600.setHours(16, 0, 0, 0)
  const time1830 = new Date(date)
  time1830.setHours(18, 30, 0, 0)
  const time0630NextWeek = addDay(weekStart(date, 1), 7)
  time0630NextWeek.setHours(6, 30, 0, 0)
  if (date.getDay() === 0 || date.getDay() === 6) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek,
    }
  }
  if (date < time0630) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630,
    }
  }
  if (date >= time0630 && date < time0900) {
    return {
      isPeakHours: true,
      nextChangeAt: time0900,
    }
  }
  if (date >= time0900 && date < time1600) {
    return {
      isPeakHours: false,
      nextChangeAt: time1600,
    }
  }
  if (date >= time1600 && date < time1830) {
    return {
      isPeakHours: true,
      nextChangeAt: time1830,
    }
  }
  // if (date >= time1830)

  // if it's Friday
  if (date.getDay() === 5) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek,
    }
  }
  const time0630Tomorrow = addDay(dayStart(date), 1)
  time0630Tomorrow.setHours(6, 30, 0, 0)
  return {
    isPeakHours: false,
    nextChangeAt: time0630Tomorrow,
  }
}

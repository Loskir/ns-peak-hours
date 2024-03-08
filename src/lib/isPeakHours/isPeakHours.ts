import { DateTime } from 'luxon'

export const isPeakHours = (
  date: Date,
): {
  isPeakHours: boolean
  nextChangeAt: Date
} => {
  // Rules for peak: Weekdays at 6:30—9:00, 16:00—18:30
  // Rules for weekend: Friday 18:30 — Monday 4:00
  // So Monday 4:00 — 6:30 is Off-Peak, but not Weekend
  const luxonDate = DateTime.fromJSDate(date, { zone: 'Europe/Amsterdam' })
  const time0630 = luxonDate.set({
    hour: 6,
    minute: 30,
    second: 0,
    millisecond: 0,
  })
  const time0900 = luxonDate.set({
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  })
  const time1600 = luxonDate.set({
    hour: 16,
    minute: 0,
    second: 0,
    millisecond: 0,
  })
  const time1830 = luxonDate.set({
    hour: 18,
    minute: 30,
    second: 0,
    millisecond: 0,
  })
  const time0630NextWeek = luxonDate
    .startOf('week')
    .plus({ week: 1 })
    .set({ hour: 6, minute: 30, second: 0, millisecond: 0 })
  if (luxonDate.isWeekend) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek.toJSDate(),
    }
  }
  if (luxonDate < time0630) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630.toJSDate(),
    }
  }
  if (luxonDate >= time0630 && luxonDate < time0900) {
    return {
      isPeakHours: true,
      nextChangeAt: time0900.toJSDate(),
    }
  }
  if (luxonDate >= time0900 && luxonDate < time1600) {
    return {
      isPeakHours: false,
      nextChangeAt: time1600.toJSDate(),
    }
  }
  if (luxonDate >= time1600 && luxonDate < time1830) {
    return {
      isPeakHours: true,
      nextChangeAt: time1830.toJSDate(),
    }
  }
  // if (luxonDate >= time1830)

  // if it's Friday
  if (luxonDate.weekday === 5) {
    return {
      isPeakHours: false,
      nextChangeAt: time0630NextWeek.toJSDate(),
    }
  }
  return {
    isPeakHours: false,
    nextChangeAt: luxonDate
      .startOf('day')
      .plus({ day: 1 })
      .set({ hour: 6, minute: 30, second: 0, millisecond: 0 })
      .toJSDate(),
  }
}

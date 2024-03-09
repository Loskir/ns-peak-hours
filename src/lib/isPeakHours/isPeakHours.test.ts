import { expect, test } from 'vitest'
import { DateTime } from 'luxon'
import { isPeakHours } from './isPeakHours'

test('correctly calculates for 6:30 AM', () => {
  const date = DateTime.local(2024, 3, 6, 6, 30, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: true,
    nextChangeAt: DateTime.local(2024, 3, 6, 9, 0, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly calculates for 9:00 AM', () => {
  const date = DateTime.local(2024, 3, 6, 9, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: false,
    nextChangeAt: DateTime.local(2024, 3, 6, 16, 0, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly calculates for 16:00 AM', () => {
  const date = DateTime.local(2024, 3, 6, 16, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: true,
    nextChangeAt: DateTime.local(2024, 3, 6, 18, 30, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly handles 20:00 on weekday', () => {
  const date = DateTime.local(2024, 3, 6, 20, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: false,
    nextChangeAt: DateTime.local(2024, 3, 7, 6, 30, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly handles 20:00 on Friday', () => {
  const date = DateTime.local(2024, 3, 8, 20, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: false,
    nextChangeAt: DateTime.local(2024, 3, 11, 6, 30, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly handles 20:00 on Saturday', () => {
  const date = DateTime.local(2024, 3, 9, 20, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: false,
    nextChangeAt: DateTime.local(2024, 3, 11, 6, 30, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})
test('correctly handles 20:00 on Sunday', () => {
  const date = DateTime.local(2024, 3, 10, 20, 0, 0, {
    zone: 'Europe/Amsterdam',
  }).toJSDate()
  expect(isPeakHours(date)).toEqual({
    isPeakHours: false,
    nextChangeAt: DateTime.local(2024, 3, 11, 6, 30, 0, {
      zone: 'Europe/Amsterdam',
    }).toJSDate(),
  })
})

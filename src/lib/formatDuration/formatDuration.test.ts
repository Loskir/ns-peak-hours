import { expect, test } from 'vitest'
import { formatDuration } from './formatDuration'

test('correctly formats duration under 1m', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3, 41, 13), new Date(2024, 3, 6, 3, 41, 13, 150)),
  ).toEqual('00:00:00')
})
test('correctly formats duration under 1s', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3, 41), new Date(2024, 3, 6, 3, 41, 13)),
  ).toEqual('00:00:13')
})
test('correctly formats duration under 1h', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3), new Date(2024, 3, 6, 3, 41, 13)),
  ).toEqual('00:41:13')
})
test('correctly formats duration under 24h', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3), new Date(2024, 3, 6, 5, 41, 13)),
  ).toEqual('02:41:13')
})
test('correctly formats duration under 48h', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3), new Date(2024, 3, 7, 5, 41, 13)),
  ).toEqual('1 day 02:41:13')
})
test('correctly formats duration > 48h', () => {
  expect(
    formatDuration(new Date(2024, 3, 6, 3), new Date(2024, 3, 10, 5, 41, 13)),
  ).toEqual('4 days 02:41:13')
})

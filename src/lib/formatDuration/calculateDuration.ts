const MS_IN_SECOND = 1000
const MS_IN_MINUTE = MS_IN_SECOND * 60
const MS_IN_HOUR = MS_IN_MINUTE * 60
const MS_IN_DAY = MS_IN_HOUR * 24
export const calculateDuration = (dateStart: Date, dateEnd: Date) => {
  let diffMs = dateEnd.getTime() - dateStart.getTime()
  const days = (diffMs / MS_IN_DAY) | 0
  days && (diffMs %= days * MS_IN_DAY)
  const hours = (diffMs / MS_IN_HOUR) | 0
  hours && (diffMs %= hours * MS_IN_HOUR)
  const minutes = (diffMs / MS_IN_MINUTE) | 0
  minutes && (diffMs %= minutes * MS_IN_MINUTE)
  const seconds = (diffMs / MS_IN_SECOND) | 0
  seconds && (diffMs %= seconds * MS_IN_SECOND)
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds: diffMs,
  }
}

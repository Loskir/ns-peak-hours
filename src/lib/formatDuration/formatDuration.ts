import { calculateDuration } from './calculateDuration'

export const formatDuration = (dateStart: Date, dateEnd: Date) => {
  const d = calculateDuration(dateStart, dateEnd)
  const formattedHMS = `${(d.hours ?? 0).toString().padStart(2, '0')}:${(
    d.minutes ?? 0
  )
    .toString()
    .padStart(2, '0')}:${(d.seconds ?? 0).toString().padStart(2, '0')}`
  if (d.days) {
    const daysWord = d.days === 1 ? 'day' : 'days'
    return `${d.days} ${daysWord} ${formattedHMS}`
  }
  return formattedHMS
}

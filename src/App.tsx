import { useStore } from '@nanostores/solid'
import { $currentDate } from './store/currentDate'
import { $isPeakHours } from './store/isPeakHours'
import { $countdown } from './store/countdown'

const CurrentDate = () => {
  const currentDate = useStore($currentDate)
  return (
    <p>
      Date: <span>{new Date(currentDate()).toLocaleString()}</span>
    </p>
  )
}
const IsPeak = () => {
  const isPeakHours = useStore($isPeakHours)
  return <p class="isPeak">{isPeakHours() ? 'yes' : 'no'}</p>
}
const PeakHoursEnd = () => {
  const isPeakHours = useStore($isPeakHours)
  return (
    <p>
      Peak hours <span>{isPeakHours() ? 'end' : 'start'}</span> in
    </p>
  )
}

const Countdown = () => {
  const countdown = useStore($countdown)
  return <p>{countdown()}</p>
}

export function App() {
  return (
    <>
      <main>
        <div>
          <p>Is it peak hours?</p>
          <IsPeak />
          <PeakHoursEnd/>
          <Countdown />
        </div>
      </main>
      <CurrentDate />
    </>
  )
}

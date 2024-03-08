<script lang="ts">
  import Countdown from './components/Countdown.svelte'
  import CurrentDate from './components/CurrentDate.svelte'
  import IsPeak from './components/IsPeak.svelte'
  import PeakHoursEnd from './components/PeakHoursEnd.svelte'
</script>

<main>
  <div>
    <p>Is it peak hours?</p>
    <IsPeak />
    <PeakHoursEnd />
    <Countdown />
  </div>
</main>
<CurrentDate />

<style>
  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

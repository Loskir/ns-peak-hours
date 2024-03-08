<script lang="ts">
  import { isPeakHours } from '../store/isPeakHours'
</script>

<p class="isPeak">{$isPeakHours ? 'yes' : 'no'}</p>

<style>
  .isPeak {
    font-size: 4rem;
    margin: 0;
    text-transform: uppercase;
  }
</style>

<script lang="ts">
  import { currentDate } from '../store/currentDate'
</script>

<p>Date: <span>{new Date($currentDate).toLocaleString()}</span></p>

<style>
</style>

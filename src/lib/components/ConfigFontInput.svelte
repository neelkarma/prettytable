<script lang="ts">
  import { config, type Config } from "$lib/stores";

  export let key: keyof Config["fonts"];
</script>

<div class="flex gap-1">
  <input bind:value={$config.fonts[key].family} />
  <input type="number" bind:value={$config.fonts[key].size} />
  <input type="checkbox" bind:checked={$config.fonts[key].bold} />
  <input type="checkbox" bind:checked={$config.fonts[key].italic} />
  <input type="checkbox" bind:checked={$config.fonts[key].underline} />
  <input type="color" bind:value={$config.fonts[key].color} />
</div>

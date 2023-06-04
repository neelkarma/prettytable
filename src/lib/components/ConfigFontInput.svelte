<script lang="ts">
  import { config, type Config } from "$lib/stores";

  export let key: keyof Config["fonts"];
</script>

<div class="flex items-center">
  <input
    class="grow rounded-l-md p-1 border-[1px] border-slate-400 focus:outline-blue-400"
    bind:value={$config.fonts[key].family}
  />
  <input
    class="w-12 p-1 rounded-r-md border-[1px] border-l-0 border-slate-400 focus:outline-blue-400"
    type="number"
    min={0}
    bind:value={$config.fonts[key].size}
  />
  <div class="flex gap-2 mx-2">
    <input type="checkbox" bind:checked={$config.fonts[key].bold} />
    <input type="checkbox" bind:checked={$config.fonts[key].italic} />
    <input type="checkbox" bind:checked={$config.fonts[key].underline} />
  </div>
  <input type="color" bind:value={$config.fonts[key].color} />
</div>

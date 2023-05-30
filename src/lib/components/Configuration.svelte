<script lang="ts">
  import { config } from "$lib/stores";
  import FlexCol from "./FlexCol.svelte";
</script>

<div class="config">
  <FlexCol>
    <h1>Configuration</h1>
    <label>
      Background Color:
      <input type="color" bind:value={$config.bgColor} />
    </label>
    <label>
      Primary Text Color:
      <input type="color" bind:value={$config.primaryTextColor} />
    </label>
    <label>
      Muted Text Color:
      <input type="color" bind:value={$config.mutedTextColor} />
    </label>
    <label>
      Separator Color:
      <input type="color" bind:value={$config.separatorColor} />
    </label>
    <label>
      Font:
      <input bind:value={$config.font} placeholder="Inter" />
    </label>
  </FlexCol>
</div>

<style>
  h1 {
    font-size: 1.2rem;
  }

  .config {
    padding: 12px;
    border-radius: 8px;
    border: 1px #c0c0c0 solid;
    background-color: #e0e0e0;
  }
</style>

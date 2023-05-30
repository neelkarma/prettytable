<script lang="ts">
  import Login from "$lib/components/Login.svelte";
  import MainView from "$lib/components/MainView.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if data?.authenticated && data?.data}
  <MainView data={data.data} />
{:else}
  <Login />
{/if}

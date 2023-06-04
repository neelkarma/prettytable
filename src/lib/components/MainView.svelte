<script lang="ts">
  import { enhance } from "$app/forms";
  import { domToPng } from "modern-screenshot";
  import Button from "./Button.svelte";
  import Config from "./Config.svelte";
  import FlexRow from "./FlexRow.svelte";
  import PrimaryButton from "./PrimaryButton.svelte";
  import Timetable from "./Timetable.svelte";

  export let data: any;

  const handleRender = async () => {
    const dataUrl = await domToPng(document.getElementById("timetable")!);
    const link = document.createElement("a");
    link.download = "timetable.png";
    link.href = dataUrl;
    link.click();
  };
</script>

<div class="flex flex-col-reverse md:flex-row gap-3 md:gap-0 md:min-h-screen">
  <Config />
  <div class="p-3 flex grow flex-col gap-3">
    <FlexRow>
      <PrimaryButton on:click={handleRender}>Export</PrimaryButton>
      <form method="POST" action="/auth?/logout" use:enhance>
        <Button>Log Out</Button>
      </form>
    </FlexRow>
    <div class="mx-auto grow">
      <Timetable {data} />
    </div>
  </div>
</div>

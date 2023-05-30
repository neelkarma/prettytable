<script lang="ts">
  import { enhance } from "$app/forms";
  import { domToPng } from "modern-screenshot";
  import Button from "./Button.svelte";
  import Configuration from "./Configuration.svelte";
  import Container from "./Container.svelte";
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

<Container>
  <FlexRow>
    <PrimaryButton on:click={handleRender}>Render and Save</PrimaryButton>
    <form method="POST" action="/auth?/logout" use:enhance>
      <Button>Log Out</Button>
    </form>
  </FlexRow>
  <div class="centered-timetable">
    <Timetable {data} />
  </div>
  <Configuration />
</Container>

<style>
  .centered-timetable {
    margin: 0 auto;
  }
</style>

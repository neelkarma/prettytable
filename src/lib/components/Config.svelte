<script lang="ts">
  import { config, validateConfig } from "$lib/stores";
  import Button from "./Button.svelte";
  import ConfigFontInput from "./ConfigFontInput.svelte";
  import ConfigSection from "./ConfigSection.svelte";
  import FlexCol from "./FlexCol.svelte";

  const handleSaveConfig = () => {
    const a = document.createElement("a");
    a.href =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify($config));
    a.download = "prettytable.json";
    a.click();
  };

  let uploadMessage = "";

  const handleImportConfig = async (e: Event) => {
    const reader = new FileReader();
    reader.readAsText((e.target as HTMLInputElement).files![0]);
    const readEvent = await new Promise<ProgressEvent<FileReader>>(
      (res) => (reader.onload = res)
    );
    const result = JSON.parse(
      (readEvent.target as FileReader).result! as string
    );

    if (!validateConfig(result)) {
      uploadMessage = "Invalid config format!";
      return;
    }

    $config = result;
    uploadMessage = "Import successful!";
  };
</script>

<div class="p-4 rounded-md border-[1px] border-slate-400 bg-slate-100">
  <FlexCol>
    <ConfigSection title="Colors">
      <label>
        Background:
        <input type="color" bind:value={$config.colors.bg} />
      </label>
      <label>
        Separator:
        <input type="color" bind:value={$config.colors.separator} />
      </label>
    </ConfigSection>
    <ConfigSection title="Fonts">
      Day:
      <ConfigFontInput key="day" />
      Period:
      <ConfigFontInput key="period" />
      Class:
      <ConfigFontInput key="class" />
      Room:
      <ConfigFontInput key="room" />
    </ConfigSection>
    <ConfigSection title="Gaps">
      <label>
        Outer
        <input type="number" bind:value={$config.gaps.outer} />
      </label>
      <label>
        Week
        <input type="number" bind:value={$config.gaps.week} />
      </label>
      <label>
        Day
        <input type="number" bind:value={$config.gaps.day} />
      </label>
      <label>
        Period
        <input type="number" bind:value={$config.gaps.period} />
      </label>
    </ConfigSection>
    <ConfigSection title="Other">
      <label>
        Include Period 0
        <input type="checkbox" bind:checked={$config.includePeriodZero} />
      </label>
    </ConfigSection>
    <ConfigSection title="Save">
      <Button on:click={handleSaveConfig}>Save Config</Button>
      <label
        >Import Config
        <input
          type="file"
          accept="application/json"
          on:change={handleImportConfig}
        />
        {uploadMessage}
      </label>
    </ConfigSection>
  </FlexCol>
</div>

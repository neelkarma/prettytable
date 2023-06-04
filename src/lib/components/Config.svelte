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

  let uploadFileInput: HTMLInputElement;
  const handleImportConfigClick = () => uploadFileInput.click();

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

  const handleReset = () => {
    // Removing the config from localStorage will automatically use defaults on next reload
    // It's also less of a pain than resetting every config value manually
    localStorage.removeItem("config");
    location.reload();
  };
</script>

<div class="p-4 bg-slate-100">
  <FlexCol>
    <ConfigSection title="Colors">
      <div class="grid grid-cols-form gap-x-2 gap-y-1 items-center">
        <label class="text-right" for="bg-color-input">Background</label>
        <input
          id="bg-color-input"
          type="color"
          bind:value={$config.colors.bg}
        />
        <label class="text-right" for="separator-color-input">Separator</label>
        <input
          id="separator-color-input"
          type="color"
          bind:value={$config.colors.separator}
        />
      </div>
    </ConfigSection>
    <ConfigSection title="Fonts">
      Day
      <ConfigFontInput key="day" />
      Period
      <ConfigFontInput key="period" />
      Class
      <ConfigFontInput key="class" />
      Room
      <ConfigFontInput key="room" />
    </ConfigSection>
    <ConfigSection title="Gaps">
      <div class="w-full grid grid-cols-form items-center gap-x-2 gap-y-1">
        <label class="text-right" for="outer-gaps-input">Outer</label>
        <input
          id="outer-gaps-input"
          class="p-1 rounded-md border-[1px] border-slate-400 focus:outline-blue-400"
          type="number"
          bind:value={$config.gaps.outer}
        />
        <label class="text-right" for="week-gaps-input">Week</label>
        <input
          id="week-gaps-input"
          class="p-1 rounded-md border-[1px] border-slate-400 focus:outline-blue-400"
          type="number"
          bind:value={$config.gaps.week}
        />
        <label class="text-right" for="day-gaps-input">Day</label>
        <input
          id="day-gaps-input"
          class="p-1 rounded-md border-[1px] border-slate-400 focus:outline-blue-400"
          type="number"
          bind:value={$config.gaps.day}
        />
        <label class="text-right" for="period-gaps-input">Period</label>
        <input
          id="period-gaps-input"
          class="p-1 rounded-md border-[1px] border-slate-400 focus:outline-blue-400"
          type="number"
          bind:value={$config.gaps.period}
        />
      </div>
    </ConfigSection>
    <ConfigSection title="Other">
      <label>
        Include Period 0
        <input type="checkbox" bind:checked={$config.includePeriodZero} />
      </label>
    </ConfigSection>
    <ConfigSection title="Save">
      <Button on:click={handleSaveConfig}>Save Config</Button>
      <Button on:click={handleImportConfigClick}>Import Config</Button>
      <input
        bind:this={uploadFileInput}
        class="hidden"
        type="file"
        accept="application/json"
        on:change={handleImportConfig}
      />
      {uploadMessage}
      <Button on:click={handleReset}>Reset to Defaults</Button>
    </ConfigSection>
  </FlexCol>
</div>

<script lang="ts">
  import { config } from "$lib/stores";
  import ConfigFontInput from "./ConfigFontInput.svelte";
  import ConfigSection from "./ConfigSection.svelte";
  import FlexCol from "./FlexCol.svelte";
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
  </FlexCol>
</div>

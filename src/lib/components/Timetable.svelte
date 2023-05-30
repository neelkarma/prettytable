<script lang="ts">
  import type { APIResponse } from "$lib/server/types";
  import { config } from "$lib/stores";
  import { getHumanDay, transformAPIResponse } from "$lib/transform";

  export let data: APIResponse;
  const transformed = transformAPIResponse(data);
</script>

<div
  id="timetable"
  style:--bgColor={$config.bgColor}
  style:--primaryTextColor={$config.primaryTextColor}
  style:--mutedTextColor={$config.mutedTextColor}
  style:--separatorColor={$config.separatorColor}
  style:--font={$config.font}
>
  {#each [...transformed.entries()] as [weekNum, week]}
    <div class="week">
      {#each [...week.entries()] as [dayNum, day]}
        <div class="day">
          <strong class="centered">{getHumanDay(weekNum, dayNum)}</strong>
          {#each day as segment}
            <div class="segment">
              {#if segment.kind == "free"}
                <span class="period">{segment.period}</span>
                <span class="centered">-</span>
              {:else if segment.kind == "period"}
                <span class="period">{segment.period}</span>
                {segment.name}
                <span class="spacer" />
                {#if segment.room}
                  {segment.room}
                {:else}
                  <span class="muted"> - </span>
                {/if}
              {:else if segment.kind == "break" || segment.kind == "rollcall"}
                <hr />
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  #timetable {
    background-color: var(--bgColor);
    color: var(--primaryTextColor);
    font-family: var(--font), "Inter", sans-serif;
    padding: 10px;
    max-width: fit-content;
    max-height: fit-content;
  }

  hr {
    border-color: var(--separatorColor);
    border-top: 1px;
    width: 100%;
  }

  .centered {
    flex-grow: 1;
    text-align: center;
  }

  .week {
    display: flex;
  }

  .day {
    display: flex;
    flex-direction: column;
    width: 6rem;
    padding: 4px;
  }

  .segment {
    display: flex;
    padding: 3px;
    width: 100%;
  }

  .spacer {
    flex-grow: 1;
  }

  .period {
    color: var(--mutedTextColor);
    padding-right: 4px;
  }

  .period::after {
    content: ":";
  }

  .muted {
    color: var(--mutedTextColor);
  }
</style>

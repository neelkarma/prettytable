<script lang="ts">
  import { styleTimetable } from "$lib/actions";
  import type { APIResponse } from "$lib/server/types";
  import { config } from "$lib/stores";
  import { getHumanDay, transformAPIResponse } from "$lib/transform";

  export let data: APIResponse;
  const transformed = transformAPIResponse(data);
</script>

<div id="timetable" use:styleTimetable>
  {#each [...transformed.entries()] as [weekNum, week]}
    <div class="week">
      {#each [...week.entries()] as [dayNum, day]}
        <div class="day">
          <strong class="centered day-header"
            >{getHumanDay(weekNum, dayNum)}</strong
          >
          {#each $config.includePeriodZero ? day : day.slice(2) as segment}
            <div class="segment">
              {#if segment.kind == "free"}
                <span class="period">{segment.period}</span>
                <span class="class centered">-</span>
              {:else if segment.kind == "period"}
                <span class="period">{segment.period}</span>
                <span class="class">{segment.name}</span>
                <span class="spacer" />
                {#if segment.room}
                  <span class="room">{segment.room}</span>
                {:else}
                  <span class="room pr-1"> - </span>
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
    @apply flex flex-col shadow-xl shadow-slate-400;
    background-color: var(--bg-color);
    padding: var(--outer-gap);
    gap: var(--week-gap);
  }

  hr {
    @apply w-full divide-y-2;
    border-color: var(--separator-color);
  }

  .centered {
    @apply grow text-center;
  }

  .week {
    @apply flex;
    gap: var(--day-gap);
  }

  .day {
    @apply flex flex-col w-[6.5rem];
    gap: var(--period-gap);
  }

  .segment {
    @apply flex items-center px-[0.15rem] w-full;
  }

  .spacer {
    @apply grow;
  }

  .day-header {
    font-family: var(--day-font-family);
    font-size: var(--day-font-size);
    font-weight: var(--day-font-weight);
    font-style: var(--day-font-style);
    text-decoration: var(--day-text-decoration);
    color: var(--day-font-color);
  }

  .period {
    @apply w-[1.7ch] pr-[0.2ch];
    font-family: var(--period-font-family);
    font-size: var(--period-font-size);
    font-weight: var(--period-font-weight);
    font-style: var(--period-font-style);
    text-decoration: var(--period-text-decoration);
    color: var(--period-font-color);
  }

  .class {
    font-family: var(--class-font-family);
    font-size: var(--class-font-size);
    font-weight: var(--class-font-weight);
    font-style: var(--class-font-style);
    text-decoration: var(--class-text-decoration);
    color: var(--class-font-color);
  }

  .room {
    font-family: var(--room-font-family);
    font-size: var(--room-font-size);
    font-weight: var(--room-font-weight);
    font-style: var(--room-font-style);
    text-decoration: var(--room-text-decoration);
    color: var(--room-font-color);
  }

  .period::after {
    content: ":";
  }
</style>

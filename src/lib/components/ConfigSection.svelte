<script lang="ts">
  export let title: string;
</script>

<div class="flex flex-col gap-1 items-stretch">
  <p class="font-bold uppercase">{title}</p>
  <slot />
</div>

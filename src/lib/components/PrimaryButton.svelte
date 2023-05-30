<script>
  import Button from "./Button.svelte";
</script>

<Button
  on:click
  --idleBg="#4444ff"
  --hoverBg="#2222ff"
  --color="#fff"
  --fontWeight="bold"
>
  <slot />
</Button>

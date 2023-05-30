<button on:click>
  <slot />
</button>

<style>
  button {
    padding: 8px;
    border-radius: 5px;
    border: 1px #a0a0a0 solid;
    color: var(--color, #000);
    background-color: var(--idleBg, #f0f0f0);
    font-weight: var(--fontWeight, normal);
    font-size: 1rem;
    transition: background-color ease-out 200ms;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--hoverBg, #e0e0e0);
  }
</style>

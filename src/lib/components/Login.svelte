<script>
  import { enhance } from "$app/forms";
  import FlexCol from "./FlexCol.svelte";
  import PrimaryButton from "./PrimaryButton.svelte";
</script>

<form method="POST" action="/auth?/login" use:enhance>
  <FlexCol>
    <h1>PrettyTable</h1>
    <p>Give your timetable a little more <em>pizzazz</em>.</p>
    <PrimaryButton>Log in with SBHS</PrimaryButton>
    <p class="muted">
      Made by <a href="https://iamkneel.vercel.app">iamkneel</a> |
      <a href="https://www.github.com/neelkarma/prettytable">Source</a>
    </p>
  </FlexCol>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  a {
    color: inherit;
  }

  .muted {
    color: #808080;
  }
</style>

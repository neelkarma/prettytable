<script>
  import { enhance } from "$app/forms";
  import PrimaryButton from "./PrimaryButton.svelte";
</script>

<form
  class="flex flex-col justify-center items-center min-h-screen"
  method="POST"
  action="/auth?/login"
  use:enhance
>
  <div class="flex flex-col gap-3 text-center">
    <h1 class="font-bold text-4xl">PrettyTable</h1>
    <p>Give your timetable a little more ✨ <em>pizzazz</em> ✨.</p>
    <PrimaryButton>Log in with SBHS</PrimaryButton>
    <p class="text-slate-500">
      Made by <a href="https://iamkneel.vercel.app">iamkneel</a> |
      <a href="https://www.github.com/neelkarma/prettytable">Source</a>
    </p>
  </div>
</form>

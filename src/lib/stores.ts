import { writable } from "svelte/store";

export const config = writable({
  bgColor: "#e5e5e5",
  primaryTextColor: "#000000",
  mutedTextColor: "#505050",
  separatorColor: "#a0a0a0",
  font: "",
});

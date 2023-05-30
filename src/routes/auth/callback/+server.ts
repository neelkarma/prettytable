import { Session } from "$lib/server/session";
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ url, cookies }) => {
  const state = url.searchParams.get("state");
  if (state !== cookies.get("api_state")) throw error(403);
  const refreshToken = url.searchParams.get("code");

  if (!refreshToken) {
    console.warn("No refresh token found in search params");
    throw redirect(301, "/");
  }

  const session = new Session(cookies);
  const sessionData = await session.get();
  await session.set({ ...sessionData, refreshToken });

  throw redirect(301, "/");
}) satisfies RequestHandler;

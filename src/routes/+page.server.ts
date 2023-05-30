import { CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
import { Session } from "$lib/server/session";
import type { APIResponse } from "$lib/server/types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const refreshAccessToken = async (session: Session) => {
  const { refreshToken } = (await session.get()) ?? {};

  if (!refreshToken) {
    return {
      authenticated: false,
    };
  }

  const res = await fetch("https://student.sbhs.net.au/api/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: refreshToken,
    }),
  });

  if (!res.ok) {
    if (res.status === 400) {
      return { authenticated: false };
    }
    throw error(500, "Internal Error (1)");
  }

  const { access_token } = await res.json();
  await session.set({ refreshToken, accessToken: access_token });
  throw redirect(301, "/");
};

const fetchResource = (accessToken: string) => {
  return fetch("https://student.sbhs.net.au/api/timetable/timetable.json", {
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
    }),
  });
};

export const load = (async ({ cookies }) => {
  const session = new Session(cookies);
  let { accessToken } = (await session.get()) ?? {};

  if (!accessToken) {
    const result = await refreshAccessToken(session);
    if (result) return result;
  }

  let res = await fetchResource(<string>accessToken);

  if (!res.ok) {
    // Unauthorized - refresh access token
    if (res.status === 401) {
      const result = await refreshAccessToken(session);
      return result;
    }

    throw error(500, "Internal Error (2)");
  }

  const data: APIResponse = await res.json();

  return {
    authenticated: true,
    data,
  };
}) satisfies PageServerLoad;

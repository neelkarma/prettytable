import { CLIENT_ID } from "$env/static/private";
import { Session } from "$lib/server/session";
import { redirect } from "@sveltejs/kit";

export const actions = {
  login: async ({ cookies }) => {
    const state = crypto.randomUUID();
    cookies.set("api_state", state);

    throw redirect(
      302,
      "https://student.sbhs.net.au/api/authorize?" +
        new URLSearchParams({
          response_type: "code",
          client_id: CLIENT_ID,
          scope: "all-ro",
          state,
        }).toString()
    );
  },
  logout: async ({ cookies }) => {
    const session = new Session(cookies);
    session.clear();
    throw redirect(301, "/");
  },
};

import Iron from "@hapi/iron";
import type { Cookies } from "@sveltejs/kit";

const SESSION_SECRET = "12345678901234567890123456789012";
const SESSION_COOKIE = "X-Session";

interface SessionData {
  refreshToken: string;
  accessToken?: string;
}

export const unseal = (sealed: string): Promise<SessionData> =>
  Iron.unseal(sealed, SESSION_SECRET, Iron.defaults);

export const seal = (unsealed: SessionData) =>
  Iron.seal(unsealed, SESSION_SECRET, Iron.defaults);

export class Session {
  private readonly cookies: Cookies;

  constructor(cookies: Cookies) {
    this.cookies = cookies;
  }

  get() {
    const sealed = this.cookies.get(SESSION_COOKIE);
    if (!sealed) return;
    return unseal(sealed);
  }

  async set(session: SessionData) {
    this.cookies.set(SESSION_COOKIE, await seal(session), {
      httpOnly: true,
      path: "/",
    });
  }

  clear() {
    this.cookies.delete(SESSION_COOKIE, {
      httpOnly: true,
      path: "/",
    });
  }
}

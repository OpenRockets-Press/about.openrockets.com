import { redirect } from "react-router";
import type { Route } from "./+types/auth.sso-callback";
import { makeSessionCookie, type ReaderSessionUser } from "../utils/auth.server";

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  
  let returnTo = url.searchParams.get("returnTo");
  // Ensure returnTo is a local path to prevent open redirects
  if (!returnTo || !returnTo.startsWith("/")) {
    returnTo = "/create";
  }

  if (!token) {
    return redirect(returnTo);
  }

  // @ts-ignore
  const env = context.cloudflare?.env || process.env;

  try {
    const response = await fetch("https://openrocketsauth.alwaysdata.net/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("SSO Token validation failed");
      return redirect(`${returnTo}?error=sso_failed`);
    }

    const userData = await response.json() as any;

    const readerUser: ReaderSessionUser = {
      id: String(userData.id),
      name: userData.name,
      email: userData.email,
      avatar_url: userData.profile?.avatar_url || null,
      country_code: userData.profile?.country_code || null,
      token: token
    };

    const cookie = await makeSessionCookie(readerUser, env);

    return new Response(null, {
      status: 302,
      headers: {
        Location: url.origin + returnTo,
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.error("SSO Exception:", error);
    return redirect(`${returnTo}?error=sso_exception`);
  }
}

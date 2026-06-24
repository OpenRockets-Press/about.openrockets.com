export interface ReaderSessionUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  country_code: string | null;
  token: string;
}

const COOKIE_NAME = "__or_reader_session";

async function deriveKey(secret: string): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function sign(payload: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const b64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${b64}.${btoa(payload)}`;
}

export async function verify(token: string, secret: string): Promise<string | null> {
  try {
    const [b64Sig, b64Payload] = token.split(".");
    if (!b64Sig || !b64Payload) return null;

    const payload = atob(b64Payload);
    const expectedSig = await sign(payload, secret);
    
    if (token !== expectedSig) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getSessionSecret(env: any): string {
  return env?.ADMIN_SESSION_SECRET?.trim() || "openrockets-dev-secret-change-me-before-production";
}

export async function makeSessionCookie(user: ReaderSessionUser, env: any): Promise<string> {
  const token = await sign(JSON.stringify(user), getSessionSecret(env));
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
}

export async function getSessionUser(request: Request, env: any): Promise<ReaderSessionUser | null> {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const match = cookieHeader.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;

  const token = decodeURIComponent(match[2]);
  const payloadStr = await verify(token, getSessionSecret(env));
  if (!payloadStr) return null;

  try {
    return JSON.parse(payloadStr) as ReaderSessionUser;
  } catch {
    return null;
  }
}

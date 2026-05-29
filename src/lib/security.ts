import { NextResponse } from "next/server";

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateStore = new Map<string, RateEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const AGENT_RATE_LIMIT = 12;
const MAX_BODY_CHARS = 16_000;

export function reject(message: string, status = 403) {
  return NextResponse.json({ error: message }, { status });
}

export function validateSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function hasBusinessLabAccess(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";

  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .includes("business_lab_access=granted");
}

export function checkRateLimit(request: Request, limit = AGENT_RATE_LIMIT) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const pathname = new URL(request.url).pathname;
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || current.resetAt < now) {
    rateStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function readLimitedJson<T>(request: Request): Promise<T> {
  const rawBody = await request.text();

  if (rawBody.length > MAX_BODY_CHARS) {
    throw new Error("Request body is too large.");
  }

  return JSON.parse(rawBody) as T;
}

export function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

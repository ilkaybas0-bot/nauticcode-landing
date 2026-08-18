import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Persistent, shared across serverless instances. Used whenever Upstash
// credentials are configured (i.e. in production once set up).
const persistentLimiter =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "10 m"),
        prefix: "nauticcode:contact",
      })
    : null;

// Fallback for when Upstash isn't configured (e.g. local dev without the
// env vars set). Resets on cold start and isn't shared across instances —
// only meant to blunt a single script hammering the endpoint locally.
const memoryLog = new Map<string, number[]>();

function isMemoryRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (memoryLog.get(key) || []).filter(
    (t) => now - t < WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS) {
    memoryLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  memoryLog.set(key, timestamps);
  return false;
}

export async function isRateLimited(key: string): Promise<boolean> {
  if (persistentLimiter) {
    const { success } = await persistentLimiter.limit(key);
    return !success;
  }
  return isMemoryRateLimited(key);
}

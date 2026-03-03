const bucket = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(key: string, limit = 100, windowMs = 60_000) {
  const now = Date.now();
  const entry = bucket.get(key);
  if (!entry || entry.reset < now) {
    bucket.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

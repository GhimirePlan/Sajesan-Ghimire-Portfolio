import { useEffect, useState } from 'react';
import { testimonials } from '../constants';
import { config } from '../constants/config';
export type TestimonialEntry = { name: string; designation: string; company: string; testimonial: string; isPublished?: boolean };
export const TESTIMONIAL_CACHE = 'portfolio-testimonials-v1';
let pending: Promise<TestimonialEntry[] | null> | undefined;
function readCache() {
  try {
    const value = JSON.parse(localStorage.getItem(TESTIMONIAL_CACHE) || 'null');
    if (value && Array.isArray(value.entries)) return value as { entries: TestimonialEntry[]; time: number };
  } catch {}
  return null;
}
export default function useTestimonials(enabled: boolean) {
  const [entries, setEntries] = useState<TestimonialEntry[]>(() => readCache()?.entries ?? testimonials);
  useEffect(() => {
    if (!enabled) return;
    const cached = readCache();
    if (cached && Date.now() - cached.time < 300_000) { setEntries(cached.entries); return; }
    let active = true;
    if (!pending) pending = fetch(`${config.apiBaseUrl}/api/testimonials`, { signal: AbortSignal.timeout(8000) })
      .then(async response => {
        if (!response.ok) throw new Error('Testimonials unavailable');
        const data = await response.json();
        const next: TestimonialEntry[] = Array.isArray(data.entries) ? data.entries : testimonials;
        try { localStorage.setItem(TESTIMONIAL_CACHE, JSON.stringify({ entries: next, time: Date.now() })); } catch {}
        return next;
      }).catch(() => null).finally(() => { pending = undefined; });
    void pending.then(next => { if (active && next) setEntries(next); });
    return () => { active = false; };
  }, [enabled]);
  return entries;
}

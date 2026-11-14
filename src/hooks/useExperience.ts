import { useEffect, useState } from 'react';
import { experiences } from '../constants';
import { config } from '../constants/config';
import type { TExperience } from '../types';
export type ExperienceEntry = TExperience & { isPublished?: boolean };
export const EXPERIENCE_CACHE = 'portfolio-experience-v1';
const TTL = 5 * 60_000;
let pending: Promise<ExperienceEntry[] | null> | undefined;
function readCache() {
  try {
    const value = JSON.parse(localStorage.getItem(EXPERIENCE_CACHE) || 'null');
    if (value && Array.isArray(value.entries)) return value as { entries: ExperienceEntry[]; time: number };
  } catch { /* Storage may be disabled. */ }
  return null;
}
export default function useExperience() {
  const [entries, setEntries] = useState<ExperienceEntry[]>(() => readCache()?.entries ?? experiences);
  useEffect(() => {
    let active = true;
    const cached = readCache();
    if (cached && Date.now() - cached.time < TTL) return;
    // Fetch once, only when the section approaches the viewport. No polling or loading UI.
    const refresh = () => {
      if (!pending) pending = fetch(`${config.apiBaseUrl}/api/experience`, { signal: AbortSignal.timeout(8000) })
        .then(async response => {
          if (!response.ok) throw new Error('Experience unavailable');
          const data = await response.json();
          const next: ExperienceEntry[] = Array.isArray(data.entries) ? data.entries : experiences;
          try { localStorage.setItem(EXPERIENCE_CACHE, JSON.stringify({ entries: next, time: Date.now() })); } catch {}
          return next;
        }).catch(() => null).finally(() => { pending = undefined; });
      void pending.then(next => { if (active && next) setEntries(next); });
    };
    const section = document.getElementById('work');
    if (!section || !('IntersectionObserver' in window)) { refresh(); return () => { active = false; }; }
    const observer = new IntersectionObserver(items => {
      if (items.some(item => item.isIntersecting)) { observer.disconnect(); refresh(); }
    }, { rootMargin: '600px' });
    observer.observe(section);
    return () => { active = false; observer.disconnect(); };
  }, []);
  return entries;
}

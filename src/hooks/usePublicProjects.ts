import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../constants/config';
import type { CatalogProject } from '../constants/projectCatalog';
export type ManagedProject = CatalogProject & {
  content?: string;
  coverImage?: string;
  coverAlt?: string;
  pdfUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  updatedAt?: string;
};
export function usePublicProjects() {
  const [projects, setProjects] = useState<ManagedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    axios
      .get<ManagedProject[]>(`${config.apiBaseUrl}/api/projects`, { signal: controller.signal })
      .then(({ data }) => {
        setProjects(data.filter(p => p.isPublished !== false));
        setLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setProjects([]);
        setError('Projects are temporarily unavailable. Please try again.');
        setLoading(false);
      });
    return () => controller.abort();
  }, [version]);
  return { projects, loading, error, reload: () => setVersion(value => value + 1) };
}

import { useEffect } from 'react';
export const SITE_URL = 'https://sajesanghimire.com.np';
export const SITE_DESCRIPTION = 'Sajesan Ghimire, electrical engineer in Nepal specializing in solar PV design, power systems, sustainable energy, research, and automation.';
export const PERSON = {
  '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Sajesan Ghimire',
  url: `${SITE_URL}/`, image: `${SITE_URL}/apple-touch-icon.png`,
  jobTitle: 'Electrical Engineer & Researcher',
  sameAs: ['https://www.linkedin.com/in/sajesan/', 'https://www.researchgate.net/profile/Sajesan-Ghimire'],
};
export default function useSeo({ title, description, path, image, type = 'website', schema, noindex = false }: {
  title: string; description: string; path: string; image?: string; type?: string;
  schema?: object; noindex?: boolean;
}) {
  const structured = schema ? JSON.stringify(schema) : '';
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const picture = image ? new URL(image, SITE_URL).href : `${SITE_URL}/apple-touch-icon.png`;
    document.title = title;
    const meta = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
      element.content = content;
    };
    meta('description', description);
    meta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    for (const [name, value] of Object.entries({ title, description, url, image: picture, type, site_name: 'Sajesan Ghimire' })) meta(`og:${name}`, value, true);
    for (const [name, value] of Object.entries({ card: 'summary_large_image', title, description, image: picture })) meta(`twitter:${name}`, value);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = url;
    document.getElementById('page-structured-data')?.remove();
    if (structured) {
      const script = document.createElement('script'); script.id = 'page-structured-data'; script.type = 'application/ld+json'; script.textContent = structured; document.head.append(script);
    }
  }, [title, description, path, image, type, structured, noindex]);
}

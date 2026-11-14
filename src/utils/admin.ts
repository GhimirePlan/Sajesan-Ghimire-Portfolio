import axios from 'axios';
import { config } from '../constants/config';
export const adminApi = axios.create({ baseURL: config.apiBaseUrl, timeout: 20000 });
adminApi.interceptors.request.use(request => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (user?.token) request.headers.Authorization = `Bearer ${user.token}`;
  } catch {}
  return request;
});
adminApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userInfo');
      window.location.assign(`${import.meta.env.BASE_URL}login`);
    }
    return Promise.reject(error);
  }
);
export const errorMessage = (error: unknown) =>
  axios.isAxiosError(error)
    ? error.response?.data?.message || error.message
    : 'Something went wrong. Please try again.';
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 180)
    .replace(/-$/, '');
export const contentLink = (kind: 'blog' | 'project', entry: any) =>
  `${window.location.origin}${import.meta.env.BASE_URL}${
    kind === 'blog'
      ? `blogs/${encodeURIComponent(entry.slug || entry._id)}`
      : `projects?project=${encodeURIComponent(entry.id)}`
  }`;
export const mediaUrl = (url: string) =>
  url.startsWith('/api/') ? `${config.apiBaseUrl}${url}` : url;
export async function uploadImage(file: File): Promise<string> {
  if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type))
    throw new Error('Choose a PNG, JPEG, WebP, or GIF image.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Choose an image smaller than 20 MB.');
  let blob: Blob = file;
  if (file.type !== 'image/gif') {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * ratio);
    canvas.height = Math.round(bitmap.height * ratio);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is unavailable. Please use an image URL.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    for (const quality of [0.84, 0.7, 0.55]) {
      blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          value => (value ? resolve(value) : reject(new Error('Could not process this image.'))),
          'image/webp',
          quality
        )
      );
      if (blob.size < 1.7 * 1024 * 1024) break;
    }
  }
  if (blob.size > 2 * 1024 * 1024)
    throw new Error('This image is too large after optimization. Choose a smaller image.');
  const { data } = await adminApi.post('/api/media', blob, {
    headers: { 'Content-Type': blob.type, 'X-Filename': encodeURIComponent(file.name) },
    timeout: 30000,
  });
  return mediaUrl(data.url);
}

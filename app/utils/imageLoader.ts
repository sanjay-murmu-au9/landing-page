export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === 'development';

  // If it's an absolute URL, return it as is
  if (src.startsWith('http')) {
    return src;
  }

  // In development, use the image as is
  if (isDev) {
    return src;
  }

  // In production (GitHub Pages), prefix with the repo name
  const prefix = '/real-estate-landing';
  // Remove any leading slash to avoid double slashes
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;
  return `${prefix}/${normalizedSrc}`;
}

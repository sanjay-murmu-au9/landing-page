export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If it's an absolute URL or data URL, return it as is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }

  // Remove any leading slash to avoid double slashes
  const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

  // In production (GitHub Pages), prefix with the repo name
  if (process.env.NODE_ENV === 'production') {
    return `/real-estate-landing/${normalizedSrc}`;
  }

  // In development, use the image as is, but ensure it starts with a slash
  return `/${normalizedSrc}`;
}

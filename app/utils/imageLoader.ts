export default function imageLoader({ src }: { src: string; width?: number; quality?: number }) {
  // Strip any leading slash to avoid issues
  const cleanPath = src.startsWith('/') ? src.slice(1) : src;
  return cleanPath;
}

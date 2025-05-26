// Helper function to get the correct image path in both development and production
export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In development, use the path as is
  // In production (for GitHub Pages), the basePath will be automatically applied by Next.js
  return cleanPath;
}

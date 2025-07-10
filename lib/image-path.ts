// Helper function to get the correct image path in both development and production
export function getImagePath(path: string): string {
  // Always return a path with a leading slash for static export
  return path.startsWith('/') ? path : '/' + path;
}

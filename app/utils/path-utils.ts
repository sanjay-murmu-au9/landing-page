// This utility file helps handle paths correctly between local development and production

/**
 * Gets the correct path for assets depending on the environment
 * @param path The relative path to the asset (e.g., "/images/my-image.jpg")
 * @returns The correct path with basePath if needed
 */
export function getAssetPath(path: string): string {
  // In development, use the path as is
  // In production with basePath, the Next.js Image component will handle the basePath automatically
  return path;
}

/**
 * Get the full URL for an uploaded image
 * @param path - The path returned from the API (e.g., "/uploads/projects/xxx.png")
 * @returns Full URL to access the image
 */
export const getImageUrl = (path: string): string => {
  if (!path) return "";

  // If path is already a full URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Otherwise, prepend the API URL
  return `${import.meta.env.VITE_API_URL}${path}`;
};

// Converts a Google Drive "share" link into a direct image URL that
// next/image can actually load. Anything that isn't a recognized Drive
// link (local /images paths, other remote URLs) passes through unchanged.
export function toDirectImageUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed || !trimmed.includes("drive.google.com")) return trimmed;

  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = fileMatch?.[1] ?? idMatch?.[1];

  if (!fileId) return trimmed;
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

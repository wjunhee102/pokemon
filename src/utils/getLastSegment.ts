export function getLastSegment(url: string) {
  const trimmedURL = url.endsWith("/") ? url.slice(0, -1) : url;

  return trimmedURL.substring(trimmedURL.lastIndexOf("/") + 1);
}

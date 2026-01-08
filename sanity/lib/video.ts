export function isYoutubeOrVimeoUrl(url: string) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()

    return (
      host === 'youtube.com' ||
      host.endsWith('.youtube.com') ||
      host === 'youtu.be' ||
      host === 'vimeo.com' ||
      host.endsWith('.vimeo.com')
    )
  } catch {
    return false
  }
}

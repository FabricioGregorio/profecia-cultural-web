import {describe, expect, it} from 'vitest'

import {isYoutubeOrVimeoUrl} from '../sanity/lib/video'

describe('isYoutubeOrVimeoUrl', () => {
  it('accepts youtube and vimeo hosts', () => {
    expect(isYoutubeOrVimeoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true)
    expect(isYoutubeOrVimeoUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true)
    expect(isYoutubeOrVimeoUrl('https://vimeo.com/123456')).toBe(true)
  })

  it('rejects non-video hosts and invalid URLs', () => {
    expect(isYoutubeOrVimeoUrl('https://example.com/watch?v=123')).toBe(false)
    expect(isYoutubeOrVimeoUrl('not-a-url')).toBe(false)
    expect(isYoutubeOrVimeoUrl('')).toBe(false)
  })
})

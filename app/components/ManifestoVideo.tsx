"use client"

import { useMemo, useState } from 'react'

type ManifestoVideoProps = {
  /** YouTube video id (e.g. 4--NUNTEtNs) */
  videoId?: string
  title?: string
}

export default function ManifestoVideo({
  videoId = '4--NUNTEtNs',
  title = 'Trailer da Profecia Cultural',
}: ManifestoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const src = useMemo(() => {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      ...(isPlaying ? { autoplay: '1' } : {}),
    })

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
  }, [isPlaying, videoId])

  return (
    <div className="w-full max-w-md lg:max-w-none">
      <div
        className="relative w-full overflow-hidden ring-1 ring-white/20 shadow-2xl transform-gpu transition-transform duration-300 ease-out hover:scale-[1.03]"
        style={{
          // 9:16 works best for YouTube Shorts
          aspectRatio: '9 / 16',
          // Blob mask (generated via CSS Blob Generator)
          borderRadius: '64% 36% 53% 47% / 39% 62% 38% 61%',
        }}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          key={src}
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        {!isPlaying && (
          <button
            type="button"
            aria-label="Reproduzir vídeo"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/35 text-white/90 transition-opacity duration-200 hover:bg-black/45 focus:outline-none"
          >
            <span className="rounded-full bg-black/40 px-5 py-3 text-sm font-sans tracking-wide ring-1 ring-white/25">
              Play
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

type ManifestoVideoProps = {
  /** YouTube video id (e.g. 4--NUNTEtNs) */
  videoId?: string
  title?: string
}

export default function ManifestoVideo({
  videoId = '4--NUNTEtNs',
  title = 'Trailer da Profecia Cultural',
}: ManifestoVideoProps) {
  return (
    <div className="w-full max-w-md lg:max-w-none">
      <div
        className="relative w-full overflow-hidden"
        style={{
          // 9:16 works best for YouTube Shorts
          aspectRatio: '9 / 16',
          // Blob mask (generated via CSS Blob Generator)
          borderRadius: '64% 36% 53% 47% / 39% 62% 38% 61%',
        }}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}

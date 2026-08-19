import React from 'react'

interface Props {
  id: string;
}

export function PostYoutube({ id }: Props) {
  return (
    <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg border shadow-md">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        className="h-full w-full"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
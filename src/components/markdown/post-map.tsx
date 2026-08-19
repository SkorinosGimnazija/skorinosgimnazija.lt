import { getLocale } from 'next-intl/server'
import React from 'react'

export async function PostMap() {
  const locale = await getLocale()

  return (
    <iframe
      className="aspect-video rounded-lg shadow-md border max-w-full"
      title="Map"
      width="100%"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAP_KEY}&q=Vilniaus+Pranciškaus+Skorinos+gimnazija&zoom=13&language=${locale}`}
    />
  )
}
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { clsx } from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  images?: string[];
}

export function NewsGallery({ images }: Props) {
  if (!images?.length) {
    return null
  }

  return (
    <Carousel className="w-full my-4">
      <CarouselContent>
        {images.map((id) =>
          <CarouselItem key={id}>
            <Image
              className="rounded-xl"
              src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${id}`}
              width={1920}
              height={1080}
              quality={85}
              loading="eager"
              alt=""
            />
          </CarouselItem>,
        )}
      </CarouselContent>
      <CarouselPrevious
        className={clsx(
          'left-2',
          'pointer-events-auto!',
          'text-white [&_svg]:drop-shadow-md',
          '[&_svg]:size-8! md:[&_svg]:size-10! lg:[&_svg]:size-14!',
        )}
        variant="link"
        size="icon-lg"
      />
      <CarouselNext
        className={clsx(
          'right-2',
          'pointer-events-auto!',
          'text-white [&_svg]:drop-shadow-md',
          '[&_svg]:size-8! md:[&_svg]:size-10! lg:[&_svg]:size-14!',
        )}
        variant="link"
        size="icon-lg"
      />
    </Carousel>
  )
}
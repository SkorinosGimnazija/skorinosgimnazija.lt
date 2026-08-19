import { Card, CardContent } from '@/components/ui/card'
import type { BannerResponse } from '@/lib/models'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  banner: BannerResponse
}

export function BannerItem({ banner }: Props) {
  const isLocal = banner.url.startsWith('/')

  return (
    <Card
      role="listitem"
      className={clsx(
        'group',
        'overflow-hidden shadow-sm p-0',
        'transition-shadow duration-200 hover:shadow-lg',
        'ring-offset-ring has-focus-visible:ring-offset-1',
      )}
    >
      <Link
        href={banner.url}
        prefetch={false}
        title={banner.title}
        target={isLocal ? undefined : '_blank'}
        rel={isLocal ? undefined : 'noopener noreferrer'}
      >
        <CardContent className="p-4">
          <Image
            className={clsx(
              'mx-auto',
              'transition-transform duration-600 ease-out',
              'not-motion-reduce:group-hover:scale-105 not-motion-reduce:group-focus-within:scale-105',
            )}
            width={banner.width}
            height={banner.height}
            src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${banner.imageUrl}`}
            alt={banner.title}
            quality={90}
          />
        </CardContent>
      </Link>
    </Card>
  )
}
import { Markdown } from '@/components/markdown/markdown'
import { NewsDate } from '@/components/news/news-date'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import type { PostResponse } from '@/lib/models'
import { clsx } from 'clsx'
import Image from 'next/image'

export function NewsPreviewItem({ post }: { post: PostResponse }) {
  const hasImage = Boolean(post.featuredImage)
  const url = `/news/${post.id}/${post.slug}`

  return (
    <Card className={clsx(
      'group',
      'relative overflow-hidden p-0 shadow-sm',
      'transition-shadow duration-200 hover:shadow-lg',
    )}>
      <Link
        href={url}
        className="absolute inset-0 z-1"
        title={post.title}
        tabIndex={-1}
        // aria-hidden={true}
      />
      <article
        className="grid lg:grid-cols-[1fr_3fr]">
        {hasImage && (
          <div className={clsx(
            'relative overflow-hidden',
            'hidden lg:block',
          )}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_URL}/${post.featuredImage}`}
              alt={post.title}
              className={clsx(
                'w-full h-full object-cover',
                'transition-transform duration-600 ease-out',
                'not-motion-reduce:group-hover:scale-105 not-motion-reduce:group-focus-within:scale-105',
              )}
              width={300}
              height={300}
              quality={90}
            />
          </div>
        )}
        <div className={clsx(
          'relative flex flex-col gap-2 py-4',
          !hasImage && 'col-span-full',
        )}>
          <CardHeader>
            <CardTitle className="text-xl leading-snug">
              <h2>
                <Link href={url}>{post.title}</Link>
              </h2>
            </CardTitle>
            <CardDescription>
              <NewsDate published={post.publishedAt} modified={post.modifiedAt} />
            </CardDescription>
          </CardHeader>
          <CardContent className="[&_a]:relative [&_a]:z-2">
            <Markdown>{post.introText}</Markdown>
          </CardContent>
        </div>
      </article>
    </Card>
  )
}
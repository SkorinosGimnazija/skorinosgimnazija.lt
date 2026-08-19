import { Markdown } from '@/components/markdown/markdown'
import { NewsDate } from '@/components/news/news-date'
import { NewsGallery } from '@/components/news/news-gallery'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PostResponse } from '@/lib/models'
import { clsx } from 'clsx'
import React from 'react'

interface Props {
  post: PostResponse;
}

export function NewsItem({ post }: Props) {
  return (
    <article>
      <Card className={clsx(
        'px-0 lg:px-4 shadow-sm',
        'transition-shadow duration-200 hover:shadow-lg',
      )}>
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl leading-snug">
            <h2>{post.title}</h2>
          </CardTitle>
          <CardDescription>
            <NewsDate published={post.publishedAt} modified={post.modifiedAt} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Markdown>{post.text}</Markdown>
          <NewsGallery images={post.images} />
        </CardContent>
      </Card>
    </article>
  )
}
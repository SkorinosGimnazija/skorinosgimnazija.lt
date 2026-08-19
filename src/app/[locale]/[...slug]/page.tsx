import { NewsItem } from '@/components/news/news-item'
import { getPostBySlug } from '@/lib/api'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type Props = PageProps<'/[locale]/[...slug]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale()
  const { slug } = await params
  const post = await getPostBySlug(locale, slug)

  if (!post) {
    const t = await getTranslations('general')
    return { title: t('pageNotFound') }
  }

  return {
    title: post.title,
    // do not set description if no meta
    ...(post.meta && { description: post.meta }),
    openGraph: {
      type: 'article',
      images: [{ url: '/logo.png' }],
    },
  }
}

export default async function MenuPage({ params }: Props) {
  const locale = await getLocale()
  const { slug } = await params
  const post = await getPostBySlug(locale, slug)

  if (!post) {
    notFound()
  }

  // show modified as published for menu pages
  const date = post.modifiedAt ?? post.publishedAt

  return <NewsItem post={{ ...post, modifiedAt: null, publishedAt: date }} />
}
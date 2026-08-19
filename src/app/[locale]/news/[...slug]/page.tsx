import { NewsItem } from '@/components/news/news-item'
import { getPathname } from '@/i18n/navigation'
import { getPostById } from '@/lib/api'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type Props = PageProps<'/[locale]/news/[...slug]'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale()
  const { slug: [id] } = await params
  const post = await getPostById(id)

  if (!post) {
    const t = await getTranslations('general')
    return { title: t('pageNotFound') }
  }

  return {
    title: post.title,
    // do not set description if no meta
    ...(post.meta && { description: post.meta }),
    alternates: {
      canonical: getPathname({ href: post.menuUrl ?? `/news/${post.id}/${post.slug}`, locale }),
    },
    openGraph: {
      type: 'article',
      images: [{ url: '/logo.png' }],
    },
  }
}

export default async function NewsPage({ params }: Props) {
  const { slug: [id] } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <NewsItem post={post} />
}
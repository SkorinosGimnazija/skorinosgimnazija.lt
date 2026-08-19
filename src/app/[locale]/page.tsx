import { News } from '@/components/news/news'
import { NewsPagination } from '@/components/news/news-pagination'
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getPosts } from '@/lib/api'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getPathname({ href: '/', locale })])),
    },
  }
}

export default async function HomePage() {
  const locale = await getLocale()
  const posts = await getPosts(locale, 1)

  if (!posts) {
    return null
  }

  const { items, ...pagination } = posts

  return (
    <>
      <News posts={items} />
      <NewsPagination {...pagination} />
    </>
  )
}
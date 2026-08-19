import { News } from '@/components/news/news'
import { NewsPagination } from '@/components/news/news-pagination'
import { getPosts } from '@/lib/api'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

type Props = PageProps<'/[locale]/news/page/[page]'>

export default async function NewsListPage({ params }: Props) {
  const locale = await getLocale()
  const { page } = await params
  const posts = await getPosts(locale, page)

  if (!posts) {
    notFound()
  }

  const { items, ...pagination } = posts

  return (
    <>
      <News posts={items} />
      <NewsPagination {...pagination} />
    </>
  )
}
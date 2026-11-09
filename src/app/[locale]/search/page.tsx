import { NewsPagination } from '@/components/news/news-pagination'
import { NewsPreviewItem } from '@/components/news/news-preview-item'
import { SearchForm } from '@/components/search/search-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { searchPosts } from '@/lib/api'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

type Props = PageProps<'/[locale]/search'>

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('search')

  return { title: t('search') }
}

export default async function SearchPage({ searchParams }: Props) {
  const [params, locale, t] = await Promise.all([searchParams, getLocale(), getTranslations('search')])
  const query = String(params.q || '')
  const page = Number(params.page) || 1

  return (
    <Card className="shadow-sm px-0 lg:px-4">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl leading-snug">
          <h2>{t('search')}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SearchForm query={query} />
        <Suspense
          key={`${query}:${page}`}
          fallback={
            <div className="mx-auto py-4">
              <Spinner className="size-8" />
            </div>
          }
        >
          <SearchResults locale={locale} query={query} page={page} />
        </Suspense>
      </CardContent>
    </Card>
  )
}

async function SearchResults({ locale, query, page }: { locale: string, query: string, page: number }) {
  const t = await getTranslations()

  if (query.length < 3) return <p></p>

  const result = await searchPosts(locale, query, page).catch(() => null)
  if (!result) {
    return (
      <p role="alert" className="text-base text-destructive mx-auto py-5">
        {t('request.serverError')}
      </p>
    )
  }

  return (
    <>
      {result.totalItems === 0 ? (
        <p className="text-base text-muted-foreground mx-auto py-5">{t('search.noResults')}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {result.items.map((post) => (
            <NewsPreviewItem key={post.id} post={{ ...post, featuredImage: null }} />
          ))}
        </div>
      )}
      <NewsPagination {...result} searchQuery={query} />
    </>
  )
}
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { PaginatedResponse } from '@/lib/models'
import { getPageRange } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

type Props = Omit<PaginatedResponse<unknown>, 'items'> & { searchQuery?: string }

const POSTS_PATH = '/news/page/'
const SEARCH_PATH = '/search?'

export async function NewsPagination({ page, totalPages, hasNextPage, hasPreviousPage, searchQuery }: Props) {
  if (totalPages <= 1) return null

  const t = await getTranslations('general')
  const pageRange = getPageRange(page, totalPages)

  return (
    <Pagination className="mt-6 mb-6">
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              href={pageUrl(page - 1, searchQuery)}
              aria-label={t('previousPage')}
              text=""
            />
          </PaginationItem>
        )}

        {pageRange.map((item, index) => (
          <PaginationItem key={item === 'ellipsis' ? `ellipsis-${index}` : item}>
            {item === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={pageUrl(item, searchQuery)}
                isActive={item === page}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              href={pageUrl(page + 1, searchQuery)}
              aria-label={t('nextPage')}
              text=""
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

function pageUrl(page: number, searchQuery?: string) {
  if (searchQuery) {
    const params = new URLSearchParams({ q: searchQuery, page: String(page) })
    return `${SEARCH_PATH}${params}`
  }

  return page === 1 ? '/' : `${POSTS_PATH}${page}`
}
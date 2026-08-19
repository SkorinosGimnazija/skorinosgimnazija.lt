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

type Props = Omit<PaginatedResponse<unknown>, 'items'>
const PATH = '/news/page/'

export async function NewsPagination({ page, totalPages, hasNextPage, hasPreviousPage }: Props) {
  if (totalPages <= 1) return null

  const t = await getTranslations('general')
  const pageRange = getPageRange(page, totalPages)

  return (
    <Pagination className="mt-6 mb-16">
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious
              href={pageUrl(page - 1)}
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
                href={pageUrl(item)}
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
              href={pageUrl(page + 1)}
              aria-label={t('nextPage')}
              text=""
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

function pageUrl(page: number) {
  return page === 1 ? '/' : `${PATH}${page}`
}
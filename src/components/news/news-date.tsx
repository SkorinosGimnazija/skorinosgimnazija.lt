import { toLocalDate } from '@/lib/dates'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

interface Props {
  published: string;
  modified?: string | null;
}

export async function NewsDate({ published, modified }: Props) {
  const t = await getTranslations('general')
  const locale = await getLocale()

  return (
    <p>
      <time dateTime={published}>{toLocalDate(published, locale)}</time>
      {modified && (
        <>
          {` (${t('modified')} `}
          <time dateTime={modified}>{toLocalDate(modified, locale)}</time>
          {')'}
        </>
      )}
    </p>
  )
}
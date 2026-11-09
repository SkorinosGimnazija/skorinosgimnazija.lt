'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useRouter } from '@/i18n/navigation'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type SubmitEvent } from 'react'

export function SearchForm({ query }: { query: string }) {
  const t = useTranslations('search')
  const router = useRouter()

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params = new URLSearchParams({ q: String(new FormData(e.currentTarget).get('q')) })
    router.push(`/search?${params}`, { scroll: false })
  }

  return (
    <form method="get" role="search" className="flex items-end gap-2" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel className="sr-only" htmlFor="search-query">{t('search')}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            key={query}
            id="search-query"
            name="q"
            type="search"
            required
            //placeholder={t('search') + '...'}
            minLength={3}
            maxLength={256}
            defaultValue={query}
          />
        </InputGroup>
      </Field>
      <Button
        type="submit"
        variant="outline"
      >
        {t('label')}
      </Button>
    </form>
  )
}
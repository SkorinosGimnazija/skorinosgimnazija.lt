'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import React, { useEffect } from 'react'

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  const t = useTranslations('request')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="shadow-sm px-0 lg:px-4">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl leading-snug">
          {t('serverError')}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React from 'react'

export default async function NotFoundPage() {
  const t = await getTranslations('general')

  return (
    <Card className="shadow-sm px-0 lg:px-4">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl leading-snug">
          <h2>{t('pageNotFound')}</h2>
        </CardTitle>
        <CardDescription>404</CardDescription>
      </CardHeader>
      <CardContent className="mx-auto">
        <Image
          src={'/404.png'}
          alt={t('pageNotFound')}
          width={500}
          height={500}
          quality={90}
          loading="eager"
        />
      </CardContent>
    </Card>
  )
}
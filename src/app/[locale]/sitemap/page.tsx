import { PostLink } from '@/components/markdown/post-link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMenus } from '@/lib/api'
import { MenuResponse } from '@/lib/models'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('general')

  return { title: t('sitemap') }
}

export default async function SitemapPage() {
  const t = await getTranslations('general')
  const locale = await getLocale()
  const menuItems = await getMenus(locale)

  return (
    <Card className="shadow-sm px-0 lg:px-4">
      <CardHeader>
        <CardTitle className="text-xl lg:text-2xl leading-snug">
          <h2>{t('sitemap')}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-lg">
          {menuItems.map((item) => (
            <SitemapItem key={item.id} item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SitemapItem({ item }: { item: MenuResponse; }) {
  if (item.children != null) {
    return (
      <li>
        <p>{item.title}</p>
        <ul className="pl-4">
          {item.children.map((child) => (
            <SitemapItem key={child.id} item={child} />
          ))}
        </ul>
      </li>
    )
  }

  return (
    <li>
      <PostLink href={item.url}>{item.title}</PostLink>
    </li>
  )
}
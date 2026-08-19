import { getPathname } from '@/i18n/navigation'
import { getLocalesMeta, getMenusMeta, getPostsMeta } from '@/lib/api'
import type { MetaResponse } from '@/lib/models'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [menus, posts, locales] = await Promise.all([
    getMenusMeta(),
    getPostsMeta(),
    getLocalesMeta(),
  ])

  return [
    ...locales.map((x) => formatMetadata(x, '/')),
    ...menus.map((x) => formatMetadata(x, x.url)),
    ...posts.map((x) => formatMetadata(x, `/news${x.url}`)),
  ]
}

function formatMetadata(item: MetaResponse, url: string): MetadataRoute.Sitemap[number] {
  const path = getPathname({ href: url, locale: item.ln })

  return {
    url: `${process.env.NEXT_PUBLIC_URL}${path}`,
    lastModified: item.date,
  }
}
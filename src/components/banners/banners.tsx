import { BannerItem } from '@/components/banners/banner-item'
import { getBanners } from '@/lib/api'
import { getLocale } from 'next-intl/server'

export async function Banners() {
  const locale = await getLocale()
  const banners = await getBanners(locale)

  if (!banners.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-4" role="list">
      {banners.map((banner) => <BannerItem key={banner.id} banner={banner} />)}
    </div>
  )
}
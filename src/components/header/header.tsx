import { Menu } from '@/components/menu/menu'
import { MobileMenu } from '@/components/menu/mobile-menu'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { clsx } from 'clsx'
import { FolderTreeIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React from 'react'
import HeroImage from './hero.jpg'

export async function Header() {
  const t = await getTranslations()

  return (
    <section className="relative h-72 md:h-100">
      <Image
        className="object-cover"
        src={HeroImage}
        quality={90}
        preload
        fill
        alt=""
      />

      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-70"
        title={t('school.name')}
        tabIndex={-1}
      >
        <Image
          src="/logo.png"
          quality={90}
          width={150}
          height={150}
          preload
          alt={t('school.name')}
        />
      </Link>

      <header className={clsx(
        'fixed md:absolute inset-x-0 top-0 z-10 min-h-12 px-4',
        'flex items-center justify-between',
        'bg-black/40 md:bg-black/10',
        'backdrop-blur-xs supports-[not(backdrop-filter:blur(0))]:bg-black/60',
        'text-white text-shadow-md text-shadow-black',
      )}>
        <div className="flex items-center gap-2">
          <MobileMenu>
            <Menu />
          </MobileMenu>
          <h1 className={clsx(
            'font-serif font-semibold text-2xl tracking-wide',
            'hidden md:block',
          )}>
            <Link href={'/'}>{t('school.name')}</Link>
          </h1>
        </div>
        <ul className="flex items-center gap-3">
          <li>
            <Link href={'/sitemap'} title={t('general.sitemap')}>
              <FolderTreeIcon className="drop-shadow-md drop-shadow-black size-5" />
            </Link>
          </li>
          {routing.locales.map((locale) => (
            <li key={locale} className="uppercase">
              <Link
                href="/"
                locale={locale}
                hrefLang={locale}
                prefetch={false} // required
              >
                {locale}
              </Link>
            </li>
          ))}
        </ul>
      </header>
    </section>
  )
}
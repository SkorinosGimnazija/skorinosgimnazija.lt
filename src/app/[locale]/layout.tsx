import { Banners } from '@/components/banners/banners'
import { Events } from '@/components/events/events'
import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import { DesktopMenu } from '@/components/menu/desktop-menu'
import { Spinner } from '@/components/ui/spinner'
import { clsx } from 'clsx'
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon } from 'lucide-react'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Rubik, Vollkorn_SC } from 'next/font/google'
import React from 'react'
import { Toaster } from 'sonner'
import '../globals.css'

const sans = Rubik({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'block',
})

const serif = Vollkorn_SC({
  variable: '--font-serif',
  subsets: ['latin', 'cyrillic'],
  weight: ['600'],
  display: 'block',
})

export const viewport: Viewport = {
  themeColor: '#fdc700',
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('school')

  return {
    metadataBase: process.env.NEXT_PUBLIC_URL,
    title: { default: t('nameShort'), template: `%s – ${t('nameShort')}` },
    description: `${t('name')}, ${t('address')}, ${t('phone')}, ${t('email')}`,
    openGraph: {
      type: 'website',
      images: [{ url: '/logo.png' }],
    },
  }
}

export default async function LocaleRootLayout({ children }: LayoutProps<'/[locale]'>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={clsx('antialiased', sans.variable, 'font-sans', serif.variable)}
    >
    <body className="relative bg-background text-foreground">

    <NextIntlClientProvider>

      <Header />

      <section
        className={clsx(
          'container relative -mt-10',
          'flex flex-row gap-8',
        )}>

        <main className="w-full md:w-[72%]">
          {children}
        </main>

        <aside className={clsx(
          'hidden md:block',
          'w-[28%] min-w-65',
        )}>
          <DesktopMenu />
          <Events />
          <Banners />
        </aside>

      </section>

      <section className="bg-gray-200">
        <Footer />
      </section>

      <Toaster
        position="bottom-center"
        icons={{
          error: <CircleXIcon className="size-5 text-destructive" />,
          warning: <CircleAlertIcon className="size-5 text-orange-300" />,
          success: <CircleCheckIcon className="size-5 text-green-600" />,
          info: <InfoIcon className="size-5" />,
          loading: <Spinner className="size-5" />,
        }}
      />

    </NextIntlClientProvider>

    </body>
    </html>
  )
}
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SiFacebook } from '@icons-pack/react-simple-icons'
import { clsx } from 'clsx'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export async function Footer() {
  const t = await getTranslations()

  return (
    <footer className="relative pt-16 mt-16">
      <div className={clsx(
        'container items-center',
        'grid grid-cols-1 md:grid-cols-2 gap-6',
        'leading-relaxed',
      )}>
        <div
          className="text-center md:text-left md:max-w-md"
          dangerouslySetInnerHTML={{ __html: t.raw('footer.content') }}
        />
        <div className="text-center md:text-right">
          <address>
            <p>{t('school.name')}</p>
            <p>{t('school.address')}</p>
            <p>{t('school.phone')}</p>
            <p>
              <a
                className="text-blue-600 underline-offset-2 hover:underline"
                href={`mailto:${t('school.email')}`}
              >
                {t('school.email')}
              </a>
            </p>
          </address>
          <ul className="flex items-center justify-center gap-2 md:justify-end">
            <li>
              <a
                className={cn(
                  buttonVariants({ variant: 'link', size: 'icon' }),
                  'hover:text-blue-600',
                )}
                href="https://www.facebook.com/profile.php?id=100057665117865"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiFacebook className="size-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="container mt-8 bg-gray-300" />

      <p className={clsx(
        'px-16 py-8 text-center text-muted-foreground',
        'shimmer shimmer-duration-10000 shimmer-spread-3',
      )}>
        &copy; {new Date().getFullYear()} {t('school.name')}
      </p>
    </footer>
  )
}
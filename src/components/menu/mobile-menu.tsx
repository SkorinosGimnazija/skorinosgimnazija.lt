'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Link } from '@/i18n/navigation'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

export function MobileMenu({ children }: { children: React.ReactNode }) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={t('general.menu')}>
            <MenuIcon className="drop-shadow-md drop-shadow-black" />
          </Button>
        }>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="overflow-y-auto"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false)
        }}>
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="font-serif text-lg pr-6">{t('school.nameShort')}</Link>
          </SheetTitle>
          <SheetDescription className="sr-only">{t('general.menu')}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
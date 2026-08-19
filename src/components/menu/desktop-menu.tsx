import { Menu } from '@/components/menu/menu'
import { Card, CardContent } from '@/components/ui/card'
import { clsx } from 'clsx'
import React from 'react'

export function DesktopMenu() {
  return (
    <Card className={clsx(
      'mb-8 py-2 shadow-sm',
      'transition-shadow duration-200 hover:shadow-lg',
    )}>
      <CardContent className="px-2">
        <Menu />
      </CardContent>
    </Card>
  )
}
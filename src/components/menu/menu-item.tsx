'use client'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Link, usePathname } from '@/i18n/navigation'
import { MenuResponse } from '@/lib/models'
import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

export function MenuItem({ item, depth = 0 }: { item: MenuResponse; depth?: number }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const paddingLeft = (depth + 1) * 0.75
  const hasChildren = item.children != null
  const isLocal = !hasChildren && item.url.startsWith('/')
  const isActive = isLocal && item.url === pathname

  if (hasChildren) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className={clsx(
            'flex w-full items-center justify-between rounded-md px-3 py-1.5',
            'hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer',
          )}
          style={{ paddingLeft: `${paddingLeft}rem` }}>
          <span className="text-left">{item.title}</span>
          <ChevronDown
            size={16}
            className={clsx('shrink-0 transition-transform duration-200', open && 'rotate-180')}
          />
        </CollapsibleTrigger>
        <CollapsibleContent
          keepMounted
          className={clsx(
            'overflow-hidden',
            'duration-500 ease-out',
            'transition-[height] h-(--collapsible-panel-height)',
            'data-starting-style:h-0 data-ending-style:h-0',
            'motion-reduce:transition-none',
          )}
        >
          <ul className="flex flex-col gap-1 my-1 px-1">
            {item.children.map((child) => (
              <li key={child.id}>
                <MenuItem item={child} depth={depth + 1} />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link
      href={item.url}
      target={isLocal ? undefined : '_blank'}
      rel={isLocal ? undefined : 'noopener noreferrer'}
      className={clsx(
        'flex w-full items-center rounded-md px-3 py-1.5',
        'hover:bg-accent hover:text-accent-foreground transition-colors',
        isActive && 'bg-accent text-accent-foreground',
      )}
      style={{ paddingLeft: `${paddingLeft}rem` }}>
      {item.title}
    </Link>
  )
}
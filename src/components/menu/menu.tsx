import { getMenus } from '@/lib/api'
import { getLocale } from 'next-intl/server'
import React from 'react'
import { MenuItem } from './menu-item'

export async function Menu() {
  const locale = await getLocale()
  const menuItems = await getMenus(locale)

  return (
    <nav className="text-base lg:text-lg">
      <ul className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
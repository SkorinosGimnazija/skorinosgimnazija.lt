import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
import React from 'react'

// export const { Link, redirect, usePathname, useRouter, getPathname } =
//   createNavigation(routing)

const navigation = createNavigation(routing)

export const {
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = navigation

// TODO prefetch bugged when switching locales
export function Link(props: React.ComponentProps<typeof navigation.Link>) {
  return React.createElement(navigation.Link, {
    ...props,
    prefetch: false,
  })
}
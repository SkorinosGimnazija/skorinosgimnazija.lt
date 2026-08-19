import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPageRange(page: number, totalPages: number) {
  const siblings = 1
  const pages: (number | 'ellipsis')[] = [1]

  const rangeStart = Math.max(2, page - siblings)
  const rangeEnd = Math.min(totalPages - 1, page + siblings)

  if (rangeStart > 2) {
    pages.push('ellipsis')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (rangeEnd < totalPages - 1) {
    pages.push('ellipsis')
  }

  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
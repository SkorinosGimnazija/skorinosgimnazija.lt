import { Link } from '@/i18n/navigation'
import { clsx } from 'clsx'
import { ExternalLinkIcon, FileTextIcon } from 'lucide-react'
import React from 'react'

interface Props {
  href: string;
  children: React.ReactNode;
}

export function PostLink({ children, href }: Props) {
  const isLocal = href.startsWith('/')
  const isDoc = !isLocal && href.startsWith(process.env.NEXT_PUBLIC_STATIC_URL)
  const isExternalLink = !isLocal && !isDoc

  return (
    <Link
      href={href}
      className={clsx(
        'text-blue-600 underline-offset-4',
        'hover:text-blue-500 hover:underline',
        '[&_svg]:inline',
      )}
      target={isLocal ? undefined : '_blank'}
      rel={isLocal ? undefined : 'noopener noreferrer'}
    >
      {isDoc && <FileTextIcon className="size-5 -mt-1" />}
      {children}
      {isExternalLink && <ExternalLinkIcon className="size-4 ml-0.5 -mt-1" />}
    </Link>
  )
}
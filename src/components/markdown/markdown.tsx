import { PostBullyReport } from '@/components/markdown/post-bully-report'
import { PostContact } from '@/components/markdown/post-contact'
import { PostInvitedStudentsList } from '@/components/markdown/post-invited-student-list'
import { PostLink } from '@/components/markdown/post-link'
import { PostMap } from '@/components/markdown/post-map'
import { PostParentsRegistration } from '@/components/markdown/post-parents-registration'
import { PostTable } from '@/components/markdown/post-table'
import { PostYoutube } from '@/components/markdown/post-youtube'
import { clsx } from 'clsx'
import MarkdownJsx from 'markdown-to-jsx'
import React from 'react'

export function Markdown({ children }: { children?: string | null }) {
  if (!children) {
    return null
  }

  return (
    <MarkdownJsx
      className={clsx(
        'leading-relaxed',
        'text-base md:text-lg',
        '[&_p]:mb-2',
        '[&_ol]:mb-2 [&_ol]:ml-5 [&_ol]:list-decimal',
        '[&_ul]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc',
      )}
      options={{
        forceBlock: true,
        disableAutoLink: true,
        overrides: {
          a: PostLink,
          table: PostTable,
          Contact: PostContact,
          Map: PostMap,
          Youtube: PostYoutube,
          InvitedStudentsList: PostInvitedStudentsList,
          ParentsRegistration: PostParentsRegistration,
          BullyReport: PostBullyReport,
        },
      }}
    >
      {children}
    </MarkdownJsx>
  )
}
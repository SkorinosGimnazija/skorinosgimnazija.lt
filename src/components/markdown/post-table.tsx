import { clsx } from 'clsx'
import { type CSSProperties, type ReactNode } from 'react'

interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function PostTable({ children, className, style }: Props) {
  return (
    <div className="overflow-x-auto">
      <table
        style={style}
        className={clsx('w-full', className)}>
        {children}
      </table>
    </div>
  )
}
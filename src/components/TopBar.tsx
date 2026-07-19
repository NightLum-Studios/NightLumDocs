import type { ReactNode } from 'react'
import { Brand } from './Brand'

export function TopBar({ children, wide = false }: { children?: ReactNode; wide?: boolean }) {
  return (
    <header className={`topbar${wide ? ' topbar--wide' : ''}`}>
      <Brand />
      <div className="topbar-actions">{children ?? <span className="topbar-note">Project documentation</span>}</div>
    </header>
  )
}

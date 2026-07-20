import type { CSSProperties, ReactNode } from 'react'

export function AppShell({ children, accent = '#b78aff', home = false }: { children: ReactNode; accent?: string; home?: boolean }) {
  return (
    <div className={`app-shell${home ? ' app-shell--home' : ''}`} style={{ '--accent': accent } as CSSProperties}>
      <div className="background-mark"><img src="assets/logos/nightlum-mark.svg" alt="" /></div>
      {children}
    </div>
  )
}

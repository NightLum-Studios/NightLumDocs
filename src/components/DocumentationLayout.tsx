import type { ReactNode } from 'react'
import { useState } from 'react'
import type { Project } from '../config/projects'
import { AppShell } from './AppShell'
import { BackToHomeButton } from './BackToHomeButton'
import { DocumentationSidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function DocumentationLayout({ project, children }: { project: Project; children: ReactNode }) {
  const [navigationOpen, setNavigationOpen] = useState(false)

  return (
    <AppShell accent={project.accent}>
      <TopBar>
        <BackToHomeButton />
        <span className="topbar-note">Documentation · v1</span>
        <button className="mobile-nav-toggle" type="button" onClick={() => setNavigationOpen(true)} aria-label="Open documentation navigation" aria-expanded={navigationOpen}>
          <span /><span /><span />
        </button>
      </TopBar>
      {children}
      <button className={`sidebar-backdrop${navigationOpen ? ' sidebar-backdrop--visible' : ''}`} type="button" aria-label="Close documentation navigation" onClick={() => setNavigationOpen(false)} />
      <DocumentationSidebar project={project} open={navigationOpen} onNavigate={() => setNavigationOpen(false)} />
    </AppShell>
  )
}

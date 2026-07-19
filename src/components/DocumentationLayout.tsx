import type { ReactNode } from 'react'
import type { Project } from '../config/projects'
import { AppShell } from './AppShell'
import { BackToHomeButton } from './BackToHomeButton'
import { DocumentationSidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function DocumentationLayout({ project, children }: { project: Project; children: ReactNode }) {
  return (
    <AppShell accent={project.accent}>
      <TopBar><BackToHomeButton /><span className="topbar-note">Documentation · v1</span></TopBar>
      {children}
      <DocumentationSidebar project={project} />
    </AppShell>
  )
}

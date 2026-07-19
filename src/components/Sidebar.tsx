import { NavLink } from 'react-router-dom'
import type { Project } from '../config/projects'
import { ProjectSwitcher } from './ProjectSwitcher'

export function DocumentationSidebar({ project }: { project: Project }) {
  return (
    <aside className="sidebar" style={{ '--accent': project.accent } as React.CSSProperties}>
      <ProjectSwitcher project={project} />
      <nav className="doc-nav" aria-label={`${project.name} documentation`}>
        {project.sections.map(section => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.pages.map(page => (
              <NavLink key={page.slug} to={`${project.basePath}/${page.slug}`}>{page.title}</NavLink>
            ))}
          </section>
        ))}
      </nav>
      <footer className="sidebar-footer">
        <div className="social-links">
          {project.socialLinks.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}
        </div>
        <p>NightLum Studios<br /><span>Tools for thoughtful worlds.</span></p>
      </footer>
    </aside>
  )
}

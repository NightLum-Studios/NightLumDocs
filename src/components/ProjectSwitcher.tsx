import { Link } from 'react-router-dom'
import { getProjectStartPath, projects, type Project } from '../config/projects'

export function ProjectSwitcher({ project }: { project: Project }) {
  return (
    <details className="project-switcher">
      <summary>
        <span className="project-avatar"><img src={project.logo} alt="" /></span>
        <span><small>{project.eyebrow}</small><strong>{project.name}</strong></span>
        <span className="chevron">⌄</span>
      </summary>
      <div className="project-menu">
        {projects.map(item => (
          <Link key={item.id} to={getProjectStartPath(item)}>
            <span className="menu-dot" style={{ background: item.accent }} />
            <span><strong>{item.name}</strong><small>{item.eyebrow}</small></span>
          </Link>
        ))}
      </div>
    </details>
  )
}

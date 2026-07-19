import { Link } from 'react-router-dom'
import { getProjectStartPath, type Project } from '../config/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" to={getProjectStartPath(project)} style={{ '--card-accent': project.accent } as React.CSSProperties}>
      <div className="project-card__top">
        <span className="project-card__logo"><img src={project.logo} alt="" /></span>
        {project.status && <span className="project-status">{project.status}</span>}
      </div>
      <div className="project-card__body">
        <small>{project.eyebrow}</small>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>
      <span className="project-card__action">Open documentation <b>→</b></span>
    </Link>
  )
}

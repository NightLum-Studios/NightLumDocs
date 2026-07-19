import { Navigate, Route, Routes } from 'react-router-dom'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { getProject, getProjectStartPath } from './config/projects'
import { useParams } from 'react-router-dom'

function ProjectIndex() {
  const { projectId } = useParams()
  const project = getProject(projectId)
  return <Navigate to={project ? getProjectStartPath(project) : '/'} replace />
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:projectId" element={<ProjectIndex />} />
      <Route path="/:projectId/:pageSlug" element={<DocsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

import { Navigate, useParams } from 'react-router-dom'
import { DocumentationLayout } from '../components/DocumentationLayout'
import { MarkdownPage } from '../components/MarkdownPage'
import { TableOfContents } from '../components/TableOfContents'
import { getProject, getProjectStartPath } from '../config/projects'
import { getMarkdown } from '../lib/content'

export function DocsPage() {
  const { projectId, pageSlug } = useParams()
  const project = getProject(projectId)
  if (!project) return <Navigate to="/" replace />
  const page = project.sections.flatMap(section => section.pages).find(item => item.slug === pageSlug)
  if (!page) return <Navigate to={getProjectStartPath(project)} replace />
  const source = getMarkdown(page.file)
  if (!source) return <main className="missing">Markdown file not found: {page.file}</main>

  return (
    <DocumentationLayout project={project}>
      <main className="content-area">
        <div className="breadcrumbs"><span>Projects</span><span>/</span><span>{project.name}</span><span>/</span><b>{page.title}</b></div>
        <article className="markdown"><MarkdownPage source={source} /></article>
        <TableOfContents source={source} />
      </main>
    </DocumentationLayout>
  )
}

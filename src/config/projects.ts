import { sigilSections } from './sigil'

export type DocPage = { slug: string; title: string; file: string }
export type DocSection = { title: string; pages: DocPage[] }
export type Project = {
  id: string
  name: string
  eyebrow: string
  description: string
  logo: string
  basePath: string
  accent: string
  status?: string
  sections: DocSection[]
  socialLinks: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'sigil',
    name: 'Sigil',
    eyebrow: 'Unity toolkit',
    description: 'A practical icon pipeline for expressive Unity interfaces.',
    logo: 'assets/logos/Sigil_logo.svg',
    basePath: '/sigil',
    accent: '#b78aff',
    status: '1.0.0',
    sections: sigilSections,
    socialLinks: [],
  },
]

export const getProject = (id?: string) => projects.find(project => project.id === id)

export const getProjectStartPath = (project: Project) =>
  `${project.basePath}/${project.sections[0].pages[0].slug}`

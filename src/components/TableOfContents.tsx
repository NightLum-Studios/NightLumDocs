import { slugify } from '../lib/slugify'

export function TableOfContents({ source }: { source: string }) {
  const headings = [...source.matchAll(/^##\s+(.+)$/gm)].map(match => match[1])
  return (
    <nav className="toc" aria-label="On this page">
      <span>On this page</span>
      {headings.map(heading => <a key={heading} href={`#${slugify(heading)}`}>{heading}</a>)}
    </nav>
  )
}

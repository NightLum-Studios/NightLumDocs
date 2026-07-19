import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { slugify } from '../lib/slugify'

export function MarkdownPage({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 id={slugify(String(children))}>{children}</h1>,
        h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
        h3: ({ children }) => <h3 id={slugify(String(children))}>{children}</h3>,
        a: ({ href, children }) => <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{children}</a>,
        blockquote: ({ children }) => <aside className="callout">{children}</aside>,
        pre: ({ children }) => <div className="code-frame"><div className="code-header"><span /><span /><span /><b>code</b></div><pre>{children}</pre></div>,
      }}
    >{source}</ReactMarkdown>
  )
}

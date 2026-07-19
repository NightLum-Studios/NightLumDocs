const markdownFiles = import.meta.glob('../../content/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export function getMarkdown(file: string) {
  return markdownFiles[`../../content/${file}`]
}

import type { DocSection } from './projects'

// Generated from content/sigil/navigation.json.
// Keep this list in the same order as the documentation manifest.
export const sigilSections = [
  {
    title: 'Documentation',
    pages: [
      { slug: '00-overview', title: 'Overview', file: 'sigil/00-overview.md' },
      { slug: '01-getting-started', title: 'Getting Started', file: 'sigil/01-getting-started.md' },
      { slug: '02-registry-and-resolution', title: 'Registry and Resolution', file: 'sigil/02-registry-and-resolution.md' },
      { slug: '03-icon-element-and-styling', title: 'IconElement and Styling', file: 'sigil/03-icon-element-and-styling.md' },
      { slug: '04-inline-svg', title: 'Inline SVG', file: 'sigil/04-inline-svg.md' },
      { slug: '05-fallbacks-and-helpers', title: 'Fallbacks and Helpers', file: 'sigil/05-fallbacks-and-helpers.md' },
      { slug: '06-custom-icon-sources', title: 'Custom Icon Sources', file: 'sigil/06-custom-icon-sources.md' },
      { slug: '07-runtime-and-performance', title: 'Runtime and Performance', file: 'sigil/07-runtime-and-performance.md' },
      { slug: '08-font-families', title: 'Font Families', file: 'sigil/08-font-families.md' },
      { slug: '08-troubleshooting', title: 'Troubleshooting', file: 'sigil/08-troubleshooting.md' },
      { slug: '09-api-reference', title: 'Public API Reference', file: 'sigil/09-api-reference.md' },
    ],
  },
] satisfies DocSection[]

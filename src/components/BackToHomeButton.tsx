import { Link } from 'react-router-dom'

export function BackToHomeButton() {
  return <Link className="back-home" to="/" aria-label="Back to project selection"><span>←</span> All projects</Link>
}

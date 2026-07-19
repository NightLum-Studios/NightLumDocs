import { AppShell } from '../components/AppShell'
import { ProjectGrid } from '../components/ProjectGrid'
import { TopBar } from '../components/TopBar'

export function HomePage() {
  return (
    <AppShell home>
      <TopBar wide><span className="topbar-note">NightLum Studios · Documentation hub</span></TopBar>
      <main className="home-content">
        <div className="home-intro">
          <span className="home-kicker">Documentation library</span>
          <h1>Tools for building<br /><em>better projects.</em></h1>
          <p>Choose a NightLum project to explore its guides, concepts, and technical reference.</p>
        </div>
        <ProjectGrid />
      </main>
      <footer className="home-footer"><span>NightLum Studios</span><span>Independent tools for game creators.</span></footer>
    </AppShell>
  )
}

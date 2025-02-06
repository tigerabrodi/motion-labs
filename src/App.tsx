import { ExperimentsList } from './components/experiments-list'
import { SiteHeader } from './components/site-header'

function App() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <SiteHeader />
      <ExperimentsList />
    </main>
  )
}

export default App

import { ExperimentsList, Header } from './components'

const shouldShow = import.meta.env.VITE_SHOW_COMPONENTS as string | undefined

function App() {
  return shouldShow ? (
    <main className="container mx-auto flex min-h-screen flex-col items-center">
      <Header />
      <ExperimentsList />
    </main>
  ) : (
    <main className="flex min-h-screen items-center justify-center">
      <p className="font-ninja text-accent-400 text-3xl">Coming soon</p>
    </main>
  )
}

export default App

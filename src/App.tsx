import { ExperimentsList } from './components/experiments-list'
import { SiteHeader } from './components/site-header'

const shouldShow = import.meta.env.VITE_SHOW_COMPONENTS as string | undefined

function Meta() {
  return (
    <>
      <title>Motion Labs - Beautiful Animation Experiments</title>
      <meta
        name="description"
        content="An open-source collection of beautiful Framer Motion animation experiments. Learn, explore, and use stunning animations in your projects."
      />
      <meta
        name="keywords"
        content="framer motion, react animations, animation experiments, open source animations, web animations, motion design, react motion"
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Motion Labs - Beautiful Animation Experiments"
      />
      <meta
        property="og:description"
        content="An open-source collection of beautiful Framer Motion animation experiments. Learn, explore, and use stunning animations in your projects."
      />
      <meta property="og:image" content="/assets/meta.png" />
      <meta property="og:url" content="https://motion-labs.dev" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Motion Labs - Beautiful Animation Experiments"
      />
      <meta
        name="twitter:description"
        content="An open-source collection of beautiful Framer Motion animation experiments. Learn, explore, and use stunning animations in your projects."
      />
      <meta name="twitter:image" content="/assets/meta.png" />

      {/* Additional Meta */}
      <meta name="theme-color" content="#FF8C00" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  )
}

function App() {
  return (
    <>
      <Meta />
      {shouldShow ? (
        <main className="container mx-auto flex min-h-screen flex-col items-center">
          <SiteHeader />
          <ExperimentsList />
        </main>
      ) : (
        <main className="flex min-h-screen items-center justify-center">
          <p className="font-ninja text-accent-400 text-3xl">Coming soon</p>
        </main>
      )}
    </>
  )
}

export default App

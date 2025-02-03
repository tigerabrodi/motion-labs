const shouldShow = import.meta.env.VITE_SHOW_COMPONENTS

function App() {
  return shouldShow ? (
    <div>hello world</div>
  ) : (
    <main className="flex min-h-screen items-center justify-center">
      <p className="font-ninja text-accent-400 text-3xl">Coming soon</p>
    </main>
  )
}

export default App

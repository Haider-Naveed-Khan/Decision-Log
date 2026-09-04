import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import DemoPage from './pages/DemoPage'

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.title = path === '/demo' ? 'Workspace — Decision Log' : 'Decision Log — Keep the why'
  }, [path])

  if (path === '/demo') return <DemoPage />
  return <LandingPage />
}

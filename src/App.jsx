import { lazy, Suspense } from 'react'
import AnimatedCursor from './components/ui/AnimatedCursor'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'

const About    = lazy(() => import('./components/sections/About'))
const Skills   = lazy(() => import('./components/sections/Skills'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact  = lazy(() => import('./components/sections/Contact'))
const Footer   = lazy(() => import('./components/layout/Footer'))
const BackToTop = lazy(() => import('./components/layout/BackToTop'))
const FaqChatbot = lazy(() => import('./components/ui/FaqChatbot'))
const NotFound = lazy(() => import('./components/pages/NotFound'))

export default function App() {
  const path = window.location.pathname
  const isRoot = path === '/' || path === '/index.html'

  if (!isRoot) {
    return (
      <>
        <AnimatedCursor />
        <Suspense>
          <NotFound />
        </Suspense>
      </>
    )
  }

  return (
    <>
      <AnimatedCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
        <FaqChatbot />
        <BackToTop />
      </Suspense>
    </>
  )
}

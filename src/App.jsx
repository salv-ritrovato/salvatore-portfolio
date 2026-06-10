import AnimatedCursor from './components/ui/AnimatedCursor'
import FaqChatbot from './components/ui/FaqChatbot'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BackToTop from './components/layout/BackToTop'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import NotFound from './components/pages/NotFound'

export default function App() {
  const path = window.location.pathname
  const isRoot = path === '/' || path === '/index.html'

  if (!isRoot) {
    return (
      <>
        <AnimatedCursor />
        <NotFound />
      </>
    )
  }

  return (
    <>
      <AnimatedCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FaqChatbot />
      <BackToTop />
    </>
  )
}
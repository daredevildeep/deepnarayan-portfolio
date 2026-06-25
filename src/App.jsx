import { MotionConfig } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import Setup from './components/Setup/Setup'
import Gaming from './components/Gaming/Gaming'
import Workflow from './components/Workflow/Workflow'
import Experience from './components/Experience/Experience'
import SampleWork from './components/SampleWork/SampleWork'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor'
import BackToTop from './components/BackToTop'

export default function App() {
  // Smooth scroll for the whole document (disabled under reduced-motion).
  useLenis()

  return (
    // reducedMotion="user" makes every Framer Motion animation in the tree
    // honor prefers-reduced-motion (disables transforms, keeps opacity).
    <MotionConfig reducedMotion="user">
      {/* Ambient overlays (Part 6.1) */}
      <div className="fx-grid" aria-hidden="true" />
      <div className="fx-vignette" aria-hidden="true" />
      <div className="fx-overlay" aria-hidden="true" />
      <CustomCursor />

      <Nav />

      <main>
        <Hero />
        <Setup />
        <Gaming />
        <Workflow />
        <Experience />
        <SampleWork />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}

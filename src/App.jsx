import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Play from './components/Play'
import FunFacts from './components/FunFacts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'
import CursorTrail from './components/CursorTrail'
import EasterEgg from './components/EasterEgg'

export default function App() {
  return (
    <>
      <FloatingParticles />
      <CursorTrail />
      <EasterEgg />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Play />
      <FunFacts />
      <Contact />
      <Footer />
    </>
  )
}

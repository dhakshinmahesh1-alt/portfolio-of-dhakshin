import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experiments from './components/Experiments'
import Gallery from './components/Gallery'
import Stats from './components/Stats'
import Learning from './components/Learning'
import Journey from './components/Journey'
import Play from './components/Play'
import FunFacts from './components/FunFacts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'
import CursorTrail from './components/CursorTrail'
import EasterEgg from './components/EasterEgg'
import KonamiCode from './components/KonamiCode'
import ClickBurst from './components/ClickBurst'
import AchievementBadges from './components/Achievements'
import GlowingLEDs from './components/GlowingLEDs'
import { ScrollProgress, SectionNav } from './components/ScrollNav'
import DarkMode from './components/DarkMode'

export default function App() {
  return (
    <>
      <FloatingParticles />
      <GlowingLEDs />
      <CursorTrail />
      <ClickBurst />
      <EasterEgg />
      <KonamiCode />
      <AchievementBadges />
      <ScrollProgress />
      <SectionNav />
      <DarkMode />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experiments />
      <Gallery />
      <Stats />
      <Learning />
      <Journey />
      <Play />
      <FunFacts />
      <Contact />
      <Footer />
    </>
  )
}

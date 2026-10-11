import { MotionConfig } from 'framer-motion'
import { ModeProvider } from './context/ModeContext'
import { Booking } from './components/Booking'
import { Bottomless } from './components/Bottomless'
import { DayNight } from './components/DayNight'
import { Delivery } from './components/Delivery'
import { Evenings } from './components/Evenings'
import { FindUs } from './components/FindUs'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { showGallery } from './data/gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Story } from './components/Story'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ModeProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          <div id="top" />
          <Hero />
          <Story />
          <DayNight />
          <Menu />
          <Bottomless />
          <Evenings />
          {showGallery && <Gallery />}
          <Booking />
          <Delivery />
          <FindUs />
        </main>
        <Footer />
      </ModeProvider>
    </MotionConfig>
  )
}

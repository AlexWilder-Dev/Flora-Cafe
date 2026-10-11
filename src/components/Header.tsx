import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ModeSwitch } from './ModeSwitch'

const NAV = [
  { href: '#story', label: 'Our story' },
  { href: '#menu', label: 'Menu' },
  { href: '#bottomless', label: 'Bottomless' },
  { href: '#evenings', label: 'Evenings' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#find-us', label: 'Find us' },
]

const base = import.meta.env.BASE_URL

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__bar">
        <a className="site-header__logo" href="#top" aria-label="Flora SW17, back to top">
          <img src={`${base}images/logo-flora.webp`} alt="" width="600" height="121" className="logo logo--ink" />
          <img src={`${base}images/logo-flora-white.webp`} alt="" width="600" height="121" className="logo logo--light" />
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ModeSwitch />
          <a className="btn btn--primary btn--sm site-header__book" href="#book">
            Book a table
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {[...NAV, { href: '#book', label: 'Book a table' }].map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30, delay: 0.04 * i }}
                >
                  <a href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="mobile-nav__foot">Unit 22a, Tooting Market · SW17</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

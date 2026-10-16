import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PROFILE } from './data'

// Adds `is-in` to every `.reveal` element once it scrolls into view.
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${PROFILE.name}` : `${PROFILE.name} — Developer`
  }, [title])
}

export function Header({ children }) {
  return (
    <header className="site-header wrap">
      {children ?? <Link to="/" className="brand">{PROFILE.name}</Link>}
      <nav className="site-nav" aria-label="Hoofdmenu">
        <Link to="/#werk">Werk</Link>
        <Link to="/#over">Over</Link>
        <Link to="/#contact" className="site-nav__strong">Contact</Link>
      </nav>
    </header>
  )
}

export function FooterLinks() {
  return (
    <div className="footer-row">
      <div className="footer-links">
        <a href={`mailto:${PROFILE.email}`}>Mail</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
      <span className="mono muted">{PROFILE.name} · {PROFILE.place}</span>
    </div>
  )
}

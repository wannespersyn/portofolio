import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CASES, PROFILE } from './data'
import { Stage, AppIcon } from './Moments'
import { Header, FooterLinks, useReveal, useTitle } from './Layout'

function Lightbox({ index, onClose, onStep }) {
  const kase = CASES[index]
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${kase.app}: ${kase.momentTitle}`} onClick={onClose}>
      <div className="lightbox__controls" onClick={(e) => e.stopPropagation()}>
        <button className="ctl" onClick={() => onStep(-1)} aria-label="Vorige">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
        </button>
        <button className="ctl" onClick={() => onStep(1)} aria-label="Volgende">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
        </button>
        <button className="ctl" onClick={onClose} aria-label="Sluiten" ref={closeRef}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
        </button>
      </div>
      <div className="lightbox__body" key={kase.slug} onClick={(e) => e.stopPropagation()}>
        <Stage kase={kase} size="lightbox" />
        <div className="lightbox__text">
          <div className="lightbox__title"><AppIcon kase={kase} /><span>{kase.app}</span></div>
          <p>{kase.lightbox}</p>
          <Link to={`/work/${kase.slug}`} className="arrow-link">Lees de case <span className="arr">→</span></Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [open, setOpen] = useState(null)
  const { hash } = useLocation()
  useTitle(null)
  useReveal()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
  }, [hash])

  const step = useCallback((d) => setOpen((i) => (i + d + CASES.length) % CASES.length), [])
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <Header />
      <main>
        <section className="intro wrap">
          <div className="status in" style={{ '--d': '.1s' }}>
            <span className="status__dot" aria-hidden="true" />{PROFILE.status}
          </div>
          <h1 className="intro__title in" style={{ '--d': '.25s' }}>
            {PROFILE.name}, developer uit {PROFILE.place}. <span className="muted">Ik bouw web-apps, van idee tot productie.</span>
          </h1>
        </section>

        <section id="werk" className="work wrap" aria-label="Werk">
          {CASES.map((kase, i) => (
            <article className="tile in" style={{ '--d': `${0.45 + i * 0.12}s` }} key={kase.slug}>
              <button className="tile__stage" onClick={() => setOpen(i)} aria-label={`${kase.app}: ${kase.momentTitle} openen`}>
                <Stage kase={kase} />
              </button>
              <div className="tile__meta">
                <AppIcon kase={kase} />
                <span className="tile__app">{kase.app}</span>
                <span className="muted">{kase.momentTitle}</span>
                <span className="mono muted tile__year">{kase.year}</span>
              </div>
              <p className="tile__line">{kase.line}</p>
              <Link to={`/work/${kase.slug}`} className="arrow-link">Case <span className="arr">→</span></Link>
            </article>
          ))}
        </section>

        <section id="over" className="about wrap reveal">
          <img className="about__photo" src={PROFILE.photo} alt={`Portret van ${PROFILE.name}`} loading="lazy" />
          <div className="about__text">
            <h2 className="kicker">Over</h2>
            <p className="lead">Ik studeerde Toegepaste Informatica aan UCLL en bouwde ondertussen echte projecten: bij ConnectNow, voor een vzw en voor klanten.</p>
            <p className="body">Ik hou van het hele traject, van een vaag idee tot iets dat in productie draait en elke dag gebruikt wordt. Buiten het werk vind je me op evenementen of aan het sporten.</p>
            <div className="facts">
              <div>
                <h3 className="kicker kicker--sm">Ervaring</h3>
                <p><strong>ConnectNow</strong><br /><span className="muted-2">Webdeveloper, studentenjob</span></p>
              </div>
              <div>
                <h3 className="kicker kicker--sm">Opleiding</h3>
                <p><strong>UCLL</strong><br /><span className="muted-2">Toegepaste Informatica, Software Development</span></p>
              </div>
              <div className="facts__wide">
                <h3 className="kicker kicker--sm">Stack</h3>
                <ul className="pills">{PROFILE.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact wrap reveal">
          <h2 className="contact__title">Laten we samenwerken.</h2>
          <p className="body">Een job, een project of gewoon een vraag: ik antwoord meestal binnen de dag.</p>
          <div className="contact__ctas">
            <a className="btn btn--dark" href={`mailto:${PROFILE.email}`}>Neem contact op</a>
            {PROFILE.cv && <a className="btn" href={PROFILE.cv} download="CV_Wannes_Persyn.pdf" type="application/pdf">Download cv</a>}
          </div>
          <FooterLinks />
        </section>
      </main>
      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </>
  )
}

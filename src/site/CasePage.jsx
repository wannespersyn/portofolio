import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { CASES } from './data'
import { Stage, AppIcon } from './Moments'
import { Header, FooterLinks, useReveal, useTitle } from './Layout'

// Consecutive stills of the same kind form one block.
function groupStills(stills = []) {
  const groups = []
  for (const s of stills) {
    const kind = s.kind ?? 'default'
    const last = groups[groups.length - 1]
    if (last && last.kind === kind) last.items.push(s)
    else groups.push({ kind, items: [s] })
  }
  return groups
}

// Horizontal slider for desktop screenshots: swipe/scroll, arrows and dots.
function DesktopSlider({ items, tint }) {
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const many = items.length > 1

  const go = (i) => {
    const el = track.current
    if (!el) return
    const n = (i + items.length) % items.length
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section className="stills-desktop reveal" style={{ background: tint }} aria-roledescription={many ? 'carrousel' : undefined}>
      <div className="slider" ref={track} onScroll={many ? onScroll : undefined} tabIndex={many ? 0 : undefined}
        onKeyDown={many ? (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
        } : undefined}
        aria-label={many ? 'Screenshots, gebruik de pijltjestoetsen om te wisselen' : undefined}>
        {items.map((s, i) => (
          <figure key={s.src} className="slide desktop-shot" aria-hidden={many && i !== active ? 'true' : undefined}>
            <img src={s.src} alt={s.alt} loading="lazy" />
          </figure>
        ))}
      </div>
      {many && (
        <div className="slider__bar">
          <div className="slider__dots">
            {items.map((s, i) => (
              <button key={s.src} className={`dot${i === active ? ' is-active' : ''}`} onClick={() => go(i)}
                aria-label={`Screenshot ${i + 1} van ${items.length}`} aria-current={i === active ? 'true' : undefined} />
            ))}
          </div>
          <div className="slider__arrows">
            <button className="ctl" onClick={() => go(active - 1)} aria-label="Vorige screenshot">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
            </button>
            <button className="ctl" onClick={() => go(active + 1)} aria-label="Volgende screenshot">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

const toList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])

export default function CasePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const index = CASES.findIndex((c) => c.slug === slug)
  const kase = CASES[index]
  const next = CASES[(index + 1) % CASES.length]

  useTitle(kase?.title)
  useReveal(slug)
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!kase) return <Navigate to="/" replace />

  return (
    <div key={slug}>
      <Header>
        <Link to="/#werk" className="back-link" aria-label="Terug naar het werk">
          <span className="back-link__icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="back-link__label">Terug<span className="back-link__more"> naar het werk</span></span>
        </Link>
      </Header>

      <nav className="case-switch wrap" aria-label="Cases">
        <span className="mono muted">Case</span>
        {CASES.map((c) => (
          <button
            key={c.slug}
            className="chip"
            aria-pressed={c.slug === slug}
            aria-label={`Case ${c.num}: ${c.title}`}
            onClick={() => navigate(`/work/${c.slug}`)}
          >{c.num}</button>
        ))}
      </nav>

      <main>
        <section className="case-intro wrap">
          <div className="case-intro__head">
            <div className="case-intro__meta in" style={{ '--d': '.05s' }}><AppIcon kase={kase} /><span>{kase.meta}</span></div>
            <h1 className="case-intro__title in" style={{ '--d': '.15s' }}>{kase.title}</h1>
          </div>
          <p className="case-intro__one in" style={{ '--d': '.3s' }}>{kase.oneliner}</p>
        </section>

        <section className="case-hero grow">
          <div className="rise"><Stage kase={kase} size="hero" /></div>
        </section>

        <div className="case-body wrap">
          <section className="fiche reveal">
            {kase.fiche.map((f) => (
              <div key={f.k}><span className="muted">{f.k}</span><strong>{f.v}</strong></div>
            ))}
            {kase.live && (
              <div><span className="muted">Live</span><a href={kase.live.href} target="_blank" rel="noopener noreferrer">{kase.live.label} ↗</a></div>
            )}
          </section>

          <section className="split reveal">
            <h2 className="kicker">Het probleem</h2>
            <p className="lead">{kase.probleem}</p>
          </section>

          <section className="split reveal">
            <h2 className="kicker">Wat ik deed</h2>
            <div className="stack-text">
              {kase.deed.map((p, i) => <p key={i} className={i ? 'body' : 'body body--strong'}>{p}</p>)}
            </div>
          </section>

          {groupStills(kase.stills).map((group, gi) => (
            group.kind === 'phone' ? (
              <section key={gi} className="stills-phones reveal" style={{ background: kase.tint }}>
                {group.items.map((s) => (
                  <figure key={s.src} className="phone-shot" style={kase.phoneRatio ? { aspectRatio: kase.phoneRatio } : undefined}><img src={s.src} alt={s.alt} loading="lazy" style={s.focus ? { objectPosition: s.focus } : undefined} /></figure>
                ))}
              </section>
            ) : group.kind === 'desktop' ? (
              <DesktopSlider key={gi} items={group.items} tint={kase.tint} />
            ) : (
              <section key={gi} className="stills reveal">
                {group.items.map((s) => (
                  <figure key={s.src} style={{ background: kase.tint }}><img src={s.src} alt={s.alt} loading="lazy" /></figure>
                ))}
              </section>
            )
          ))}

          <section className="split reveal">
            <h2 className="kicker">{kase.resultaat ? 'Wat het opleverde' : 'In cijfers'}</h2>
            <div className="stack-text">
              {toList(kase.resultaat).map((p, i) => <p key={i} className="lead">{p}</p>)}
              <div className="numbers">
                {kase.cijfers.map((n) => (
                  <div key={n.k}><span className="numbers__v">{n.v}</span><span className="muted">{n.k}</span></div>
                ))}
              </div>
            </div>
          </section>

          <section className="reveal">
            <Link to={`/work/${next.slug}`} className="next-case" aria-label={`Volgende case: ${next.title}`}>
              <span className="mono muted">Volgende case · {next.num}</span>
              <span className="next-case__row"><span className="next-case__title">{next.title}</span><span className="arr">→</span></span>
            </Link>
          </section>
        </div>
      </main>

      <footer className="wrap case-footer"><FooterLinks /></footer>
    </div>
  )
}

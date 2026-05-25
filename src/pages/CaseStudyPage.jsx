import { useEffect } from 'react'
import { Nav, Footer, Cursor } from '../App'

export default function CaseStudyPage({ config }) {
  const {
    documentTitle,
    eyebrow,
    title,
    subtitle,
    subtitleMaxWidth = '22ch',
    meta,
    browserUrl,
    hero,
    sections,
    gallery,
    galleryAfterIndex = 1,
    next,
  } = config

  useEffect(() => { document.title = `${documentTitle} — Wannes Persyn` }, [documentTitle])

  const renderSection = ({ label, content, stack }) => (
    <section key={label}>
      <div className="cs-body">
        <div className="label reveal">{label}</div>
        <div className="reveal">
          {stack ? (
            <div className="cs-stack">
              {stack.map(({ category, tags }) => (
                <div className="cs-stack-row" key={category}>
                  <span className="cs-stack-row-label">{category}</span>
                  <div className="cs-stack-pills">
                    {tags.map(tag => (
                      <span className="cs-stack-pill" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : content}
        </div>
      </div>
    </section>
  )

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <section className="cs-hero">
          <a className="back-link reveal" href="/">← Back to index</a>
          <div className="eyebrow reveal" style={{ marginTop: 24 }}>
            <span className="dot"></span> {eyebrow}
          </div>
          <h1 className="reveal">
            <span>{title}</span>
            <br />
            <span style={{ fontSize: '0.42em', fontStyle: 'normal', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink-dim)', display: 'inline-block', marginTop: '0.5em', maxWidth: subtitleMaxWidth, lineHeight: 1.2 }}>
              {subtitle}
            </span>
          </h1>
          <div className="cs-meta reveal">
            {meta.map(({ k, v }) => (
              <div key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
            ))}
          </div>
        </section>

        <section className="cs-shot reveal" style={{ paddingTop: 0 }}>
          <div className="browser">
            <div className="browser-bar">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="url">{browserUrl}</span>
            </div>
            <div className="browser-body">{hero}</div>
          </div>
        </section>

        {sections.slice(0, galleryAfterIndex + 1).map(renderSection)}

        <section style={{ paddingTop: 0 }}>
          <div className="cs-gallery">{gallery}</div>
        </section>

        {sections.slice(galleryAfterIndex + 1).map(renderSection)}

        <section className="cs-next">
          <div>
            <span className="label">Next case →</span>
            <h3 className="next-title"><a href={next.href} data-cursor="link">{next.title}</a></h3>
          </div>
          <a href="/" className="back-link">All work →</a>
        </section>
      </main>
      <Footer />
    </>
  )
}

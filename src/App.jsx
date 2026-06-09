import { useState, useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect } from './TweaksPanel'

// ── tweakable defaults — host can rewrite this JSON ────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "poster",
  "typePair": "editorial",
  "frameReveal": "slices",
  "deflosjColor": "#2f8a6d",
  "wildwinesColor": "#7a1f2b",
  "accent": "mono",
  "cardStyle": "frame"
} /*EDITMODE-END*/;

const ACCENTS = {
  mono: { color: "#f3f1ec", ink: "#0a0a0a", label: "Mono" },
  orange: { color: "#ff6a3d", ink: "#0a0a0a", label: "Ember" },
  red: { color: "#e63946", ink: "#fafafa", label: "Blood" },
  sand: { color: "#d4a574", ink: "#0a0a0a", label: "Sand" }
};

const TYPE_PAIRS = {
  editorial: {
    display: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
    body: '"Geist", "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
    label: "Editorial"
  },
  brutal: {
    display: '"Geist", "Hanken Grotesk", ui-sans-serif, sans-serif',
    body: '"Geist", "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    label: "Brutal"
  },
  mono: {
    display: '"JetBrains Mono", "Geist Mono", ui-monospace, monospace',
    body: '"Geist", "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
    label: "Mono"
  }
};

// ── nav ────────────────────────────────────────────────────────────────────
export function Nav() {
  const [time, setTime] = useState(formatBrussels());
  useEffect(() => {
    const t = setInterval(() => setTime(formatBrussels()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <nav className="nav">
      <div className="nav-logo">
        <a href="/"><b>WP</b></a>
        <span>— Wannes Persyn</span>
      </div>
      <div className="nav-links">
        <a className="nav-link" href="/#work" data-cursor="link">Work</a>
        <a className="nav-link" href="/#about" data-cursor="link">About</a>
        <a className="nav-link" href="/#praise" data-cursor="link">Praise</a>
        <a className="nav-link" href="/#contact" data-cursor="link">Contact</a>
        <span className="nav-clock">{time}</span>
      </div>
    </nav>);

}

function formatBrussels() {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Europe/Brussels"
  });
  return `BRU · ${fmt.format(d)}`;
}

function HeroPoster() {
  return (
    <section className="hero hero-poster" data-comment-anchor="8ae3440e1a-section-108-5">
      <div className="hp-corners">
        <div className="hp-meta tl">
          <span className="kicker">[ 01 / Full-stack developer ]</span>
          <span className="role">BUILDS WEB APPS FROM BLANK TO RUNNING PROD.</span>
        </div>
        <div className="hp-meta tr">
          <span className="status"><span className="dot live"></span> Available ’26</span>
          <span className="loc">LEUVEN· BE</span>
        </div>
      </div>

      <div className="hp-stage">
        <div className="hp-row hp-top">
          <span className="hp-name">
            {"WANNES".split("").map((c, i) =>
            <span key={i} className="hp-letter" style={{ "--i": i }}>{c}</span>
            )}
          </span>
        </div>
        <div className="hp-row hp-mid">
          <div className="hp-side hp-side-l">
            <span className="hp-num">№ 26 — Last-year student</span>
            <span className="hp-it">Junior dev,</span>
            <span className="hp-strong">no shortcuts.</span>
          </div>
          <div className="hp-portrait">
            <img
              id="portrait-hero"
              src="/images/profile.jpeg"
              alt="Portrait of Wannes"
            />
          </div>
          <div className="hp-side hp-side-r">
            <span className="hp-num">Selected work — 02</span>
            <span className="hp-strong"><b>Deflosj</b></span>
            <span className="hp-strong"><b>Wildwines</b></span>
          </div>
        </div>
        <div className="hp-row hp-bot">
          <span className="hp-name stroke">
            {"PERSYN".split("").map((c, i) =>
            <span key={i} className="hp-letter" style={{ "--i": i }}>{c}</span>
            )}
            <span className="hp-letter hp-dot-letter" style={{ "--i": 6 }}><span className="dot">.</span></span>
          </span>
        </div>
      </div>

      <div className="hp-foot">
        <span style={{"--i": 0}}>React</span><i style={{"--i": 0}}>·</i>
        <span style={{"--i": 1}}>Next.js</span><i style={{"--i": 1}}>·</i>
        <span style={{"--i": 2}}>Node</span><i style={{"--i": 2}}>·</i>
        <span style={{"--i": 3}}>TypeScript</span><i style={{"--i": 3}}>·</i>
        <span style={{"--i": 4}}>Prisma</span><i style={{"--i": 4}}>·</i>
        <span style={{"--i": 5}}>Postgres</span><i style={{"--i": 5}}>·</i>
        <span style={{"--i": 6}}>Tailwind</span><i style={{"--i": 6}}>·</i>
        <span style={{"--i": 7}}>Java</span><i style={{"--i": 7}}>·</i>
        <span style={{"--i": 8}}>Python</span>
      </div>
    </section>);

}

// ── marquee ───────────────────────────────────────────────────────────────
function Marquee() {
  const words = ["Full-stack", "React", "Next.js", "TypeScript", "Node", "Prisma", "Postgres", "Tailwind", "Java", "Python", "Azure"];
  const run =
  <span>
      {words.map((w, i) =>
        <React.Fragment key={i}>
          {w} <span className="sep">✦</span>{" "}
        </React.Fragment>
    )}
    </span>;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {run}{run}{run}{run}
      </div>
    </div>);

}

// ── work ──────────────────────────────────────────────────────────────────
const PROJECTS = [
{
  num: "001 / 02",
  year: "2026 — In progress",
  title: "Deflosj",
  colorKey: "deflosjColor",
  kicker: "Community platform · VZW",
  blurb: "A digital home for a Flemish village's beloved non-profit — events, news, contact, and a yearly tournament with full registration, planning board and live brackets. Built from a blank Figma file to a running production stack.",
  role: "Solo full-stack — design, frontend, API, infra",
  stack: "Next.js · React · TS · Tailwind · Node · Express · Prisma · Postgres",
  timeline: "Jan 2026 — present",
  href: "/work/deflosj",
  live: "deflosj.vercel.app",
  tags: ["Next.js", "React", "TypeScript", "Tailwind", "Express", "Prisma", "Postgres"],
  slotId: "shot-deflosj"
},
{
  num: "002 / 02",
  year: "2025 — Shipped",
  title: "Wildwines",
  colorKey: "wildwinesColor",
  kicker: "E-commerce + admin dashboard",
  blurb: "A storefront for a Belgian wine merchant — shop, tastings, food pairings, plus a full admin dashboard so the client can run the whole catalogue without ever pinging me. The good kind of build: she edits, I don't.",
  role: "Solo full-stack — frontend, dashboard, API",
  stack: "Next.js · React · TS · Tailwind · Node · Express · Prisma · Postgres",
  timeline: "Sep 2025 — May 2026",
  href: "/work/wildwines",
  live: "wildwines.be",
  tags: ["Next.js", "React", "Stripe", "Tailwind", "Express", "Prisma", "Postgres"],
  slotId: "shot-wildwines"
}];


function Work({ cardStyle, frameReveal, projColors }) {
  return (
    <section id="work">
      <div className="section-head reveal">
        <div>
          <div className="eyebrow"><span className="dot"></span> Selected work — 02</div>
          <h2>Two builds, both shipping,<br />shipping, both real.</h2>
        </div>
        <div className="sh-right">
          <ol className="sh-index">
            {PROJECTS.map((p, i) =>
            <li key={p.title}>
                <span className="shi-n">{String(i + 1).padStart(2, "0")}</span>
                <a className="shi-t" href={p.href}>{p.title}</a>
                <span className="shi-rule" aria-hidden="true"></span>
                <span className="shi-y">{p.year}</span>
              </li>
            )}
          </ol>
        </div>
      </div>
      <div className="work-list">
        {PROJECTS.map((p, i) =>
          <ProjectCard key={p.title} project={p} style={cardStyle} index={i} frameReveal={frameReveal} projColor={projColors[p.colorKey]} />
        )}
      </div>
    </section>);

}

function ProjectVisual({ p, frameReveal, projColor }) {
  const mode = frameReveal || "slices";

  return (
    <div
      className="proj-visual"
      style={{ "--proj-color": projColor }}>
      <div className="browser">
        <div className="browser-bar">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="url">{p.live}</span>
        </div>
        <div className="browser-body">
          <img src={`/images/${p.title.toLowerCase()}/${p.title.toLowerCase()}_homepage.png`} alt={`${p.title} project shot`} className="proj-shot" />
          <div className={`proj-reveal proj-reveal--${mode}`} aria-hidden="true">
            {mode !== "slices" && <div className="pr-bg"></div>}
            {mode !== "slices" && <>
              <div className="pr-skel pr-skel--nav"></div>
              <div className="pr-skel pr-skel--hero"></div>
              <div className="pr-skel pr-skel--cardA"></div>
              <div className="pr-skel pr-skel--cardB"></div>
              <div className="pr-skel pr-skel--cardC"></div>
            </>}
            {mode === "slices" &&
            <div className="pr-slices">
                {Array.from({ length: 8 }).map((_, i) =>
              <div key={i} className="pr-slice" style={{ "--i": i }}>
                    <div className="pr-slice-fill"></div>
                  </div>
              )}
                <div className="pr-scan"></div>
                <div className="pr-readout">
                  <span className="pr-readout-l">{p.title.toUpperCase()}</span>
                  <span className="pr-readout-r">↗ LIVE</span>
                </div>
              </div>
            }
            {mode === "code" &&
            <div className="pr-code">
                <div className="pr-line" style={{ "--d": "0.30s", "--w": "22ch" }}>
                  <em>import</em> {`{ Hero, Grid }`} <em>from</em> <s>'./{p.title.toLowerCase()}'</s>
                </div>
                <div className="pr-line" style={{ "--d": "0.55s", "--w": "30ch" }}>
                  <em>export default function</em> <b>{p.title}</b>() {`{`}
                </div>
                <div className="pr-line" style={{ "--d": "0.80s", "--w": "10ch" }}>
                  &nbsp;&nbsp;<em>return</em> (
                </div>
                <div className="pr-line" style={{ "--d": "1.05s", "--w": "18ch" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="pc-t">main</span> className=<s>"shipped"</s>&gt;
                </div>
                <div className="pr-line" style={{ "--d": "1.30s", "--w": "14ch" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="pc-t">Hero</span> /&gt;
                </div>
                <div className="pr-line" style={{ "--d": "1.55s", "--w": "14ch" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="pc-t">main</span>&gt;
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}

function ProjectCard({ project, style, index, frameReveal, projColor }) {
  const p = project;
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current || revealed) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [revealed]);

  const revealClass = revealed ? "is-revealed" : "is-pending";
  const cardStyle = { "--proj-color": projColor };

  const Visual = () => <ProjectVisual p={p} frameReveal={frameReveal} projColor={projColor} />;

  const Text = () =>
  <div className="proj-text">
      <span className="proj-num"><span className="ptx">{p.num} · {p.year}</span></span>
      <h3 className="proj-title"><span className="ptx">{p.title}</span></h3>
      <div className="proj-kicker"><span className="ptx">{p.kicker}</span></div>
      <p className="proj-blurb"><span className="ptx">{p.blurb}</span></p>
      <div className="proj-tags">
        {p.tags.map((t, i) => <span key={t} style={{ "--i": i }}>{t}</span>)}
      </div>
      <dl className="proj-meta">
        <dt><span className="ptx">Role</span></dt><dd><span className="ptx">{p.role}</span></dd>
        <dt><span className="ptx">Timeline</span></dt><dd><span className="ptx">{p.timeline}</span></dd>
        <dt><span className="ptx">Live</span></dt><dd><span className="ptx">{p.live}</span></dd>
      </dl>
      <a className="proj-cta" href={p.href} data-cursor="link">
        <span className="ptx">Open case study <span className="arr">→</span></span>
      </a>
    </div>;


  if (style === "index") {
    return (
      <div ref={ref} className={`proj index reveal ${revealClass}`} style={cardStyle}>
        <div className="proj-num">{p.num}</div>
        <Text />
        <Visual />
      </div>);

  }

  if (style === "poster") {
    return (
      <a href={p.href} data-cursor="link" style={{ display: 'block' }}>
        <div ref={ref} className={`proj poster reveal ${revealClass}`} style={cardStyle}>
          <Visual />
          <div className="proj-text">
            <div>
              <span className="proj-num">{p.num} · {p.year}</span>
              <h3 className="proj-title" style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}>{p.title}</h3>
              <div className="proj-kicker">{p.kicker}</div>
            </div>
            <div>
              <p className="proj-blurb" style={{ color: 'rgba(255,255,255,0.85)' }}>{p.blurb}</p>
              <div className="proj-cta">View case study <span className="arr">→</span></div>
            </div>
          </div>
        </div>
      </a>);

  }

  // default: frame
  return (
    <div ref={ref} className={`proj frame reveal ${revealClass}`} style={cardStyle}>
      <Text />
      <Visual />
    </div>);

}

// ── about ─────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!ref.current || revealed) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
    obs.observe(ref.current);
    // Safety: ensure reveal even if observer never fires
    const safety = setTimeout(() => setRevealed(true), 1800);
    return () => { obs.disconnect(); clearTimeout(safety); };
  }, [revealed]);
  return (
    <section id="about" ref={ref} className={`about-sec ${revealed ? "is-revealed" : "is-pending"}`}>
      <div className="section-head reveal">
        <div>
          <div className="eyebrow"><span className="dot"></span> About — 03</div>
          <h2>Wannes, on Wannes.<br />Brief, honest, italicised.</h2>
        </div>
        <p className="lede">
          A final-year student who taught himself to ship by, well, shipping.
          Two years of nights, weekends, real clients, real bugs, real deploys.
        </p>
      </div>

      <div className="about">
        <div className="col-portrait reveal">
          <div className="frame">
            <img
              src="/images/apple.JPG"
              alt="Me at the apple visitor center."
            />
          </div>
          <div className="caption">
            <span>WP · 2026</span>
            <span>LEUVEN, BE</span>
          </div>
        </div>

        <div className="about-body reveal">
          <p>
            I'm <strong>Wannes</strong> — last-year full-stack student, <span className="em">two years</span> of building things people actually use. I prefer <span className="em">small details done well</span> over big systems half-finished.
          </p>
          <p>
            My rule: if the client can't change it without me, I haven't finished. Hence dashboards, well-typed APIs, and a deep suspicion of <span className="em">"just hardcode it for now"</span>.
          </p>
          <p>
            I treat junior like a posture, not a ceiling — ask questions, ship daily, read the PR comments twice. The senior part comes later. The taste is non-negotiable.
          </p>

          <div className="stats">
            <div className="stat reveal">
              <Counter value="2" suffix="y" />
              <div className="lbl">Years building</div>
            </div>
            <div className="stat reveal">
              <Counter value="2" />
              <div className="lbl">Shipped projects</div>
            </div>
            <div className="stat reveal">
              <Counter value="0" suffix=" / 10" />
              <div className="lbl">Hardcoded URLs left in prod</div>
            </div>
          </div>

          <div className="stack reveal">
            <h4>The toolbox — current</h4>
            <div className="stack-grid">
              <div className="stack-group" data-cat="01">
                <span className="sg-label">Frontend</span>
                <div className="sg-items">
                  <span className="sg-item sg-item--lead">React</span>
                  <span className="sg-item">Next.js</span>
                  <span className="sg-item">Tailwind</span>
                </div>
              </div>
              <div className="stack-group" data-cat="02">
                <span className="sg-label">Backend</span>
                <div className="sg-items">
                  <span className="sg-item sg-item--lead">Node</span>
                  <span className="sg-item">Express</span>
                  <span className="sg-item">Prisma</span>
                  <span className="sg-item">Postgres</span>
                </div>
              </div>
              <div className="stack-group" data-cat="03">
                <span className="sg-label">Languages</span>
                <div className="sg-items">
                  <span className="sg-item sg-item--lead">TypeScript</span>
                  <span className="sg-item">Java</span>
                  <span className="sg-item">Python</span>
                </div>
              </div>
              <div className="stack-group" data-cat="04">
                <span className="sg-label">Infra</span>
                <div className="sg-items">
                  <span className="sg-item sg-item--lead">Azure</span>
                  <span className="sg-item">GitHub</span>
                  <span className="sg-item">Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Counter({ value, suffix = "" }) {
  const target = parseInt(value, 10) || 0;
  const [n, setN] = useState(target);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    // Animate from 0 → target when in view; if rAF doesn't progress, value
    // is already at target via initial state.
    setN(0);
    let cancelled = false;
    const animate = () => {
      const dur = 1200;
      const t0 = performance.now();
      const tick = (now) => {
        if (cancelled) return;
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    let kicked = false;
    const kick = () => {if (!kicked) {kicked = true;animate();}};
    try {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {kick();obs.disconnect();}
      }, { threshold: 0.5 });
      obs.observe(el);
    } catch (_) {kick();}
    // Fallback: ensure value is the target after 1s even if observer/rAF stall.
    const safety = setTimeout(() => {cancelled = true;setN(target);}, 1500);
    return () => {cancelled = true;clearTimeout(safety);};
  }, [value]);
  return <div className="num" ref={ref}>{n}{suffix}</div>;
}

// ── praise ────────────────────────────────────────────────────────────────
const REVIEWS = [
{
  body: "Wannes is the rare junior who reads the brief twice and the codebase three times. Quietly the best teammate on the project.",
  name: "Lotte Janssens",
  role: "Senior Engineer — fmr. teammate",
  avatar: "LJ"
},
{
  body: "Asked for a landing page, got a CMS, a planning board and three side features I didn't know I needed. Annoying, in the best way.",
  name: "Tom Vermeulen",
  role: "Client — Wildwines",
  avatar: "TV"
},
{
  body: "Ships fast, then refactors faster. Half my PR comments turn into Slack DMs because he's already fixed it before I hit submit.",
  name: "Emma Peeters",
  role: "Project lead — school capstone",
  avatar: "EP"
}];


function Praise() {
  return (
    <section id="praise">
      <div className="section-head reveal">
        <div>
          <div className="eyebrow"><span className="dot"></span> Praise — 04</div>
          <h2>What people said,<br />after the deploy.</h2>
        </div>
        <p className="lede">
          Three teammates, three projects, three slightly different angles on the same thing — he reads carefully, ships often, and asks better questions than most.
        </p>
      </div>
      <div className="reviews">
        {REVIEWS.map((r, i) =>
        <div className="review reveal" key={i}>
            <div className="mark">“</div>
            <div className="body">{r.body}</div>
            <div className="who">
              <div className="avatar">{r.avatar}</div>
              <div>
                <div className="name">{r.name}</div>
                <div className="role">{r.role}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ── contact ───────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="eyebrow reveal" style={{ marginBottom: 32 }}><span className="dot"></span> Contact — 05</div>
      <h2 className="reveal">
        Let's build<br />
        <a href="mailto:wannes.persyn@gmail.com" data-cursor="link"><i>something</i> together</a>.
      </h2>
      <div className="contact-row reveal">
        <div>
          <span className="lbl">Email</span>
          <span className="val"><a href="mailto:wannes.persyn@gmail.com" data-cursor="link">WANNES.PERSYN@GMAIL.COM</a></span>
        </div>
        <div>
          <span className="lbl">GitHub</span>
          <span className="val"><a href="https://github.com/wannespersyn" data-cursor="link">@wannespersyn</a></span>
        </div>
        <div>
          <span className="lbl">LinkedIn</span>
          <span className="val"><a href="https://www.linkedin.com/in/wannes-persyn/" data-cursor="link">HTTPS://WWW.LINKEDIN.COM/IN/WANNES-PERSYN/</a></span>
        </div>
        <div>
          <span className="lbl">Located</span>
          <span className="val">ROTSELAAR, BE</span>
        </div>
      </div>
    </section>);

}

export function Footer() {
  return (
    <footer className="footer">
      <div><span className="blink"></span> Open for roles — Q3 2026</div>
      <div>© 2026 Wannes Persyn · Built with care, not frameworks-of-the-week</div>
    </footer>);

}

// ── cursor ────────────────────────────────────────────────────────────────
export function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;if (!el) return;
    let x = window.innerWidth / 2,y = window.innerHeight / 2;
    let tx = x,ty = y;
    const move = (e) => {tx = e.clientX;ty = e.clientY;};
    const out = () => el.classList.add('is-hidden');
    const back = () => el.classList.remove('is-hidden');
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', out);
    window.addEventListener('mouseenter', back);

    document.addEventListener('mouseover', (e) => {
      const t = e.target;
      if (t.closest && t.closest('[data-cursor="link"], a, button')) el.classList.add('is-link');
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target;
      if (t.closest && t.closest('[data-cursor="link"], a, button')) el.classList.remove('is-link');
    });

    let raf;
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {cancelAnimationFrame(raf);window.removeEventListener('mousemove', move);};
  }, []);
  return <div className="cursor" ref={ref}></div>;
}

// ── scroll reveal ─────────────────────────────────────────────────────────
function useRevealOnScroll() {
  // No-op: kept as a hook stub in case we re-enable scroll animations later.
  // The current strategy is "always visible" because animation timing is unreliable
  // in some preview environments (iframe sandbox can pause CSS transitions).
} // ── tweaks panel ──────────────────────────────────────────────────────────
function Tweaks({ t, setTweak }) {return <TweaksPanel title="Tweaks">
      <TweakSection label="Hero layout">
        <TweakSelect label="Variant" value={t.hero} options={[{ value: 'split', label: 'Editorial split' }, { value: 'poster', label: 'Brutal poster' }, { value: 'manifesto', label: 'Manifesto quote' }]} onChange={(v) => setTweak('hero', v)} />
        
      </TweakSection>
      <TweakSection label="Type pairing">
        <TweakRadio label="Pair" value={t.typePair} options={[{ value: 'editorial', label: 'Editorial' }, { value: 'brutal', label: 'Brutal' }, { value: 'mono', label: 'Mono' }]} onChange={(v) => setTweak('typePair', v)} />
        
      </TweakSection>
      <TweakSection label="Accent color">
        <TweakColor label="Accent" value={t.accent} options={[{ value: 'mono', color: '#f3f1ec' }, { value: 'orange', color: '#ff6a3d' }, { value: 'red', color: '#e63946' }, { value: 'sand', color: '#d4a574' }]} onChange={(v) => setTweak('accent', v)} />
        
      </TweakSection>
      <TweakSection label="Project card style">
        <TweakRadio label="Style" value={t.cardStyle} options={[{ value: 'frame', label: 'Frame' }, { value: 'index', label: 'Index' }, { value: 'poster', label: 'Poster' }]} onChange={(v) => setTweak('cardStyle', v)} />
        
      </TweakSection>
      <TweakSection label="Project frame reveal">
        <TweakSelect label="Animation" value={t.frameReveal}
        options={[
        { value: 'slices', label: 'Slice scan' },
        { value: 'code', label: 'Code writes itself' },
        { value: 'skeleton', label: 'Skeleton pulse' },
        { value: 'wireframe', label: 'Wireframe draws' }]
        }
        onChange={(v) => setTweak('frameReveal', v)} />
        <TweakColor
        label="Deflosj color"
        value={t.deflosjColor}
        options={['#2f8a6d', '#3b82c4', '#7a5af8', '#d97757', '#1f2937']}
        onChange={(v) => setTweak('deflosjColor', v)} />
        <TweakColor
        label="Wildwines color"
        value={t.wildwinesColor}
        options={['#7a1f2b', '#b3324a', '#4a1d2e', '#c45a3c', '#1f2937']}
        onChange={(v) => setTweak('wildwinesColor', v)} />
      </TweakSection>
    </TweaksPanel>;

}

// ── app ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useRevealOnScroll();
  const projColors = { deflosjColor: t.deflosjColor, wildwinesColor: t.wildwinesColor };

  // apply tokens to :root
  useEffect(() => {
    const r = document.documentElement.style;
    const a = ACCENTS[t.accent] || ACCENTS.mono;
    const tp = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.editorial;
    r.setProperty('--accent', a.color);
    r.setProperty('--accent-ink', a.ink);
    r.setProperty('--font-display', tp.display);
    r.setProperty('--font-body', tp.body);
    r.setProperty('--font-mono', tp.mono);
  }, [t.accent, t.typePair]);

  const Hero = t.hero === 'poster' ? HeroPoster :
  t.hero === 'manifesto' ? HeroManifesto :
  HeroSplit;

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero key={t.hero} />
        <Work cardStyle={t.cardStyle} frameReveal={t.frameReveal} projColors={{ deflosjColor: t.deflosjColor, wildwinesColor: t.wildwinesColor }} />
        <About />
        {/* <Praise /> */}
        <Contact />
      </main>
      <Footer />
      <Tweaks t={t} setTweak={setTweak} />
      <Analytics />
    </>);

}

export default App
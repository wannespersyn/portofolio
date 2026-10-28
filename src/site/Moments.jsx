// Small animated phone mocks, one interaction per project. Pure CSS animation.

function OrderMoment() {
  return (
    <div className="m-pad">
      <div className="m-row">
        <span className="m-label">Wijnen</span>
        <span className="m-badge a-bump">
          <span className="a-badge"><span>0</span><span>1</span></span>
        </span>
      </div>
      <div className="m-bottle-wrap"><div className="m-bottle" /></div>
      <div className="m-name">Zinfandel</div>
      <div className="m-sub">Californië · rood</div>
      <div className="m-cta a-press">In winkelmand</div>
    </div>
  )
}

// Bracket geometry (phone content is 156px wide):
// round 1 at x 0–40, semi-finals at x 56–96, winner at x 112–156.
// Each box is 20px high; a box sits exactly halfway between the two it comes from.
const ROUND1 = [12, 72, 112, 172]       // tops → centres 22, 82, 122, 182
const SEMIS = [42, 142]                 // centres 52 and 152
const WINNER_TOP = 92                   // centre 102

function BracketMoment() {
  return (
    <div className="m-pad m-pad--tight">
      <span className="m-label">Petanque · KO</span>
      <div className="m-bracket">
        <svg width="156" height="200" viewBox="0 0 156 200" aria-hidden="true">
          <path className="a-draw" pathLength="220" d="M40 22 H48 V52 H56 M40 82 H48 V52 M40 122 H48 V152 H56 M40 182 H48 V152 M96 52 H104 V102 H112 M96 152 H104 V102" />
        </svg>
        {ROUND1.map((top, i) => (
          <div key={top} className="m-team" style={{ left: 0, top }}>Ploeg {'ABCD'[i]}</div>
        ))}
        {SEMIS.map((top, i) => (
          <div key={top} className="m-team" style={{ left: 56, top }}>Ploeg {'AD'[i]}</div>
        ))}
        <div className="m-team m-team--win a-win" style={{ left: 112, top: WINNER_TOP }}>Winnaar</div>
      </div>
    </div>
  )
}

function TrackMoment() {
  return (
    <div className="m-pad m-pad--gap">
      <span className="m-label">Kies je traject</span>
      <div className="m-seg">
        <div className="m-seg-thumb"><div className="a-seg" /></div>
        <div className="m-seg-opt">Commercieel</div>
        <div className="m-seg-opt">Individueel</div>
      </div>
      <div className="m-track">
        <div className="a-fadeA">
          <div className="m-track-title">Voor teams</div>
          <i style={{ width: '90%' }} /><i style={{ width: '76%' }} /><i style={{ width: '84%' }} />
        </div>
        <div className="a-fadeB">
          <div className="m-track-title">Voor jezelf</div>
          <i style={{ width: '70%' }} /><i style={{ width: '88%' }} /><i style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  )
}

// Shussapp: tap the winning duo, count a Mama, save, then climb from #3 to #2.
// Caps use the same 21-tooth crown silhouette as the avatars in the app.
const CAP_CLIP = (() => {
  const teeth = 21
  const steps = teeth * 8
  const pts = []
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const r = 50 * (1 - 0.07 * (1 - (1 + Math.cos(a * teeth)) / 2))
    pts.push(`${(50 + r * Math.sin(a)).toFixed(2)}% ${(50 - r * Math.cos(a)).toFixed(2)}%`)
  }
  return `polygon(${pts.join(',')})`
})()

function Cap({ c, children }) {
  return <span className={`sh-cap sh-cap--${c}`} style={{ clipPath: CAP_CLIP }}><span>{children}</span></span>
}

// Split-flap number: every digit column rolls from its old to its new value, staggered.
function Flap({ from, to, anim }) {
  return (
    <span className="sh-flap">
      {[...to].map((d, i) => (
        <span key={i} className="sh-flap__col">
          <span className={anim} style={{ animationDelay: `${i * 0.07}s` }}><span>{from[i]}</span><span>{d}</span></span>
        </span>
      ))}
    </span>
  )
}

function ShussMoment() {
  return (
    <div className="sh">
      <div className="sh-screen a-shA">
        <span className="sh-kicker">Potje · 4-mat</span>
        <span className="sh-title">Wie won?</span>
        <div className="sh-duo a-duo1">
          <span className="sh-caps"><Cap c="gold">J</Cap><Cap c="mint">T</Cap></span>
          <span className="sh-duo__name">Jij &amp; Tibo</span>
          <span className="sh-place a-place1">1e</span>
        </div>
        <div className="sh-duo a-duo2">
          <span className="sh-caps"><Cap c="red">L</Cap><Cap c="cream">B</Cap></span>
          <span className="sh-duo__name">Lars &amp; Bo</span>
          <span className="sh-place sh-place--2 a-place2">2e</span>
        </div>
        <div className="sh-mama">
          <span>Mama’s</span>
          <span className="sh-count a-bumpM"><Flap from="0" to="1" anim="a-flapM" /></span>
        </div>
        <div className="sh-cta a-shPress">Opslaan</div>
      </div>

      <div className="sh-screen sh-screen--b a-shB">
        <span className="sh-kicker">Crew · De Kelder</span>
        <div className="sh-rank">
          <span className="sh-rank__n">#<Flap from="3" to="2" anim="a-flapR" /></span>
          <span className="sh-elo">
            <span className="sh-delta a-delta">+17</span>
            <Flap from="1284" to="1301" anim="a-flapR" />
          </span>
        </div>
        <span className="sh-label">Vorm</span>
        <div className="sh-form">
          <div className="a-form">{[1, 0, 1, 1, 0, 1].map((w, i) => <i key={i} className={w ? 'w' : undefined} />)}</div>
        </div>
        <div className="sh-board">
          {[1, 2, 3].map((n) => <span key={n} className="sh-board__n" style={{ top: (n - 1) * 24 }}>{n}</span>)}
          <div className="sh-row" style={{ top: 0 }}><span>Lars</span><span>1322</span></div>
          <div className="sh-row a-rowDown" style={{ top: 24 }}><span>Bo</span><span>1290</span></div>
          <div className="sh-row sh-row--me a-rowUp" style={{ top: 48 }}><span>Jij</span><Flap from="1284" to="1301" anim="a-flapR" /></div>
        </div>
      </div>
    </div>
  )
}

const MOMENTS = { order: OrderMoment, bracket: BracketMoment, track: TrackMoment, shuss: ShussMoment }

// The coloured stage with the phone in it. `size` is 'tile' | 'lightbox' | 'hero'.
export function Stage({ kase, size = 'tile' }) {
  const Moment = MOMENTS[kase.moment]
  return (
    <div className={`stage stage--${size}`} style={{ background: kase.tint, '--accent': kase.color }}>
      <div className="phone" aria-hidden="true">
        <Moment />
      </div>
    </div>
  )
}

export function AppIcon({ kase }) {
  return (
    <span className="app-icon" style={{ background: kase.color }} aria-hidden="true">
      {kase.iconSrc ? <img src={kase.iconSrc} alt="" /> : kase.icon}
    </span>
  )
}

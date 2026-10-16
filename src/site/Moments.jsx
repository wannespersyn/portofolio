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

const MOMENTS = { order: OrderMoment, bracket: BracketMoment, track: TrackMoment }

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
  return <span className="app-icon" style={{ background: kase.color }} aria-hidden="true">{kase.icon}</span>
}

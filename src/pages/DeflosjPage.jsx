import CaseStudyPage from './CaseStudyPage'

const config = {
  documentTitle: 'Deflosj',
  eyebrow: 'Case study — 001 / 02 · In progress · 2026',
  title: 'Deflosj.',
  subtitle: "A digital home for a Flemish village's beloved non-profit.",
  subtitleMaxWidth: '22ch',
  meta: [
    { k: 'Client',   v: 'VZW · Local village' },
    { k: 'Role',     v: 'Solo full-stack' },
    { k: 'Timeline', v: 'Jan 2026 — present' },
    { k: 'Live',     v: <a href="https://deflosj.vercel.app" target="_blank" rel="noopener">deflosj.vercel.app ↗</a> },
  ],
  browserUrl: 'deflosj.vercel.app',
  hero: <img src="/images/deflosj/deflosj_homepage.png" alt="Screenshot of the homepage, showing a news feed and an upcoming events list." />,
  sections: [
    {
      label: '01 — Brief',
      content: <>
        <p>
          The VZW asked for <strong>"a small site with events and contact info."</strong> Two months in, it had grown a <span className="em">news feed</span>, a <span className="em">tournament registration flow</span>, a <span className="em">planning board</span> for organisers, and a CMS — because every time we shipped one feature, three more became obvious.
        </p>
        <p>
          The constraint was real: <strong>volunteers run this thing</strong>. Nothing could require a developer to change. The site had to outlive me.
        </p>
      </>,
    },
    {
      label: '02 — What I shipped',
      content: <ul>
        <li>Public site — events, news, contact, gallery, FAQ. Next.js, statically generated where it counts, ISR for content that moves.</li>
        <li>Tournament module — registrations for the yearly <em>dorpelingenkoers</em>, with team brackets, time slots, and automatic pairing.</li>
        <li>Planning board — drag-and-drop scheduling tool for the organisers, with conflict detection and CSV export.</li>
        <li>Mini-CMS — typed content models in Prisma, an admin panel the volunteers can use without breaking anything.</li>
        <li>Auth, role-based access, transactional emails, a deploy pipeline that doesn't require me to be awake.</li>
      </ul>,
    },
    {
      label: '03 — The stack',
      stack: [
        { category: 'Frontend', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
        { category: 'Backend',  tags: ['Node', 'Express', 'Prisma', 'PostgreSQL'] },
        { category: 'Infra',    tags: ['Vercel', 'Railway', 'Slack'] },
        { category: 'DX',       tags: ['TypeScript', 'Zod', 'End-to-end tests'] },
      ],
    },
    {
      label: '04 — What I learned',
      content: <>
        <p>
          Volunteers don't read docs. So the CMS has <span className="em">no docs</span> — every field is its own form, every confirmation is a sentence, every destructive action asks twice.
        </p>
        <p>
          Also: <strong>Postgres is enough</strong>. A junior reflex is to reach for Redis, queues, edge functions. None of that was needed. One database, one API, one frontend, one boring deploy. Boring is good.
        </p>
      </>,
    },
  ],
  gallery: <>
    <div className="shot reveal wide">
      <img src="/images/deflosj/deflosj_tournament.png" alt="Screenshot of the tournament module, showing the registration flow." />
    </div>
    <div className="shot reveal">
      <img src="/images/deflosj/deflosj_dashboard.png" alt="Screenshot of the dashboard, showing an overview of upcoming events and news." />
    </div>
    <div className="shot reveal">
      <img src="/images/deflosj/deflosj_planning.png" alt="Screenshot of the planning board, showing a drag-and-drop interface for scheduling events." />
    </div>
  </>,
  next: { title: 'Wildwines', href: '/work/wildwines' },
}

export default function DeflosjPage() {
  return <CaseStudyPage config={config} />
}

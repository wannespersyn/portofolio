import CaseStudyPage from './CaseStudyPage'

const config = {
  documentTitle: 'Wildwines',
  eyebrow: 'Case study — 002 / 02 · Shipped · 2025',
  title: 'Wildwines.',
  subtitle: 'An e-commerce storefront for a Belgian wine merchant, with a dashboard he actually uses.',
  subtitleMaxWidth: '24ch',
  meta: [
    { k: 'Client',   v: 'Wildwines · BE' },
    { k: 'Role',     v: 'Solo full-stack' },
    { k: 'Timeline', v: 'Sep 2025 — May 2026' },
    { k: 'Live',     v: <a href="https://www.wildwines.be" target="_blank" rel="noopener">wildwines.be ↗</a> },
  ],
  browserUrl: 'wildwines.be',
    hero: <img src="/images/wildwines/wildwines_homepage.png"  alt="The homepage, showing a hero image, a featured wine section, and an editorial section with articles about wine and food pairings." />,
    sections: [
    {
      label: '01 — Brief',
      content: <>
        <p>
          The owner sells <strong>natural wines</strong> from a small shop in Belgium. He wanted a site that <em>"feels like the shop, not like a webshop"</em> — warm, slow, opinionated — and a backend where he could run the whole catalogue without ever texting me.
        </p>
        <p>
          The unspoken rule: <span className="em">he edits, I don't.</span> If a product needs changing at 11pm on a Sunday, that's his job, not mine. A win is a deploy I never have to do.
        </p>
      </>,
    },
    {
      label: '02 — What I shipped',
      content: <ul>
        <li>Storefront — wines, tastings, food pairings, editorial pages. Designed to read more like a magazine than a Shopify clone.</li>
        <li>Cart + checkout — Stripe-backed, with pickup-in-shop and ship-to-home, VAT handled properly because Belgium is fussy.</li>
        <li>Admin dashboard — full CRUD over wines, stock, events, pages, images. Inline editing, drag-to-reorder, autosave.</li>
        <li>Tastings & pairings — a small CMS for editorial content, where he writes once and it shows up in three places without copy-paste.</li>
        <li>Reporting — monthly revenue, top wines, low-stock alerts, exported to CSV for his accountant.</li>
      </ul>,
    },
    {
      label: '03 — The stack',
      stack: [
        { category: 'Frontend', tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
        { category: 'Backend',  tags: ['Node', 'Express', 'Prisma', 'PostgreSQL', 'Stripe', 'Resend'] },
        { category: 'Admin',    tags: ['Protected routes', 'Role-based access', 'Optimistic updates'] },
        { category: 'Infra',    tags: ['Vercel', 'Azure', 'Daily backups'] },
      ],
    },
    {
      label: '04 — What I learned',
      content: <>
        <p>
          The dashboard is the product. The customer-facing site is what people see, but the client lives in the admin. <strong>Hours spent on the dashboard saved hundreds of support DMs.</strong>
        </p>
        <p>
          And: <span className="em">copy is design</span>. Half of this build was rewriting button labels, error states, empty states, and confirmation screens so the shop sounds like the shop — not like an out-of-the-box Stripe template.
        </p>
      </>,
    },
  ],
  gallery: <>
    <div className="shot reveal wide">
      <img src="/images/wildwines/wildwines_homepage.png"  alt="The homepage, showing a hero image, a featured wine section, and an editorial section with articles about wine and food pairings." />
    </div>
    <div className="shot reveal">
      <img src="/images/wildwines/wildwines_foodpairing.png" alt="A page showing food pairings for different wines." />
    </div>
    <div className="shot reveal">
      <img src="/images/wildwines/wildwines_product.png" alt="A product page, showing the wine details, tasting notes, food pairings, and an add-to-cart form." />
    </div>
  </>,
  next: { title: 'Deflosj', href: '/work/deflosj' },
}

export default function WildwinesPage() {
  return <CaseStudyPage config={config} />
}

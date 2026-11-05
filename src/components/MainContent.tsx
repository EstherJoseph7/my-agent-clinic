type DashboardStatProps = {
  label: string;
  value: string;
};

type WorkspaceCardProps = {
  href: string;
  title: string;
  description: string;
  action: string;
};

const dashboardSummary: DashboardStatProps[] = [
  { label: 'Agents supported', value: '12' },
  { label: 'Care items to review', value: '4' },
  { label: 'Staff updates', value: '3' },
];

const workspaceLinks: WorkspaceCardProps[] = [
  {
    href: '#agents',
    title: 'Agents and shared context',
    description:
      'Get oriented around agent information and the context staff need to coordinate support.',
    action: 'View agent overview',
  },
  {
    href: '#care-flow',
    title: 'Care coordination',
    description: 'See an overview of the areas involved in coordinating care.',
    action: 'View care coordination',
  },
  {
    href: '#contact',
    title: 'Clinic staff',
    description: 'Reach the clinic team for help with coordination.',
    action: 'Contact the clinic',
  },
];

function DashboardStat({ label, value }: DashboardStatProps) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function WorkspaceCard({ href, title, description, action }: WorkspaceCardProps) {
  return (
    <a href={href} className="info-card access-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="access-action">
        {action} <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}

function MainContent() {
  return (
    <main>
      <section id="overview" className="hero" aria-labelledby="overview-heading">
        <div className="hero-copy">
          <p className="eyebrow">Agent and staff workspace</p>
          <h1 id="overview-heading">Clinic overview</h1>
          <p className="intro">
            A shared starting point for agents and clinic staff to find the areas
            they need to coordinate care.
          </p>
        </div>

        <aside className="hero-panel" aria-label="Illustrative dashboard summary">
          <p className="sample-note">Illustrative sample data — not live clinic information.</p>
          {dashboardSummary.map((item) => (
            <DashboardStat key={item.label} {...item} />
          ))}
        </aside>
      </section>

      <section className="content-panel" aria-labelledby="workspaces-heading">
        <div className="panel-heading">
          <p className="eyebrow">Quick access</p>
          <h2 id="workspaces-heading">Where would you like to go?</h2>
        </div>
        <div className="card-grid">
          {workspaceLinks.map((workspace) => (
            <WorkspaceCard key={workspace.href} {...workspace} />
          ))}
        </div>
      </section>

      <section id="agents" className="content-panel" aria-labelledby="agents-heading">
        <div className="panel-heading">
          <p className="eyebrow">Agent directory</p>
          <h2 id="agents-heading">Agents and shared context</h2>
        </div>
        <p className="section-description">
          Find an overview of agent information and the shared context involved
          in care coordination.
        </p>
      </section>

      <section id="care-flow" className="content-panel" aria-labelledby="care-flow-heading">
        <div className="panel-heading">
          <p className="eyebrow">Care coordination</p>
          <h2 id="care-flow-heading">A shared view for agents and staff</h2>
        </div>
        <p className="section-description">
          Agents and staff can use this shared starting point to orient
          themselves around care information and available support.
        </p>
      </section>
    </main>
  );
}

export default MainContent;

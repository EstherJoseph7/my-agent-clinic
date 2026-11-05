const careHighlights = [
  { label: 'Care plans', value: '3 in motion' },
  { label: 'Agent triage', value: '24/7' },
  { label: 'Staff handoff', value: 'ready' },
];

function MainContent() {
  return (
    <main>
      <section id="overview" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Care coordination for people and AI agents</p>
          <h1>AgentClinic</h1>
          <p className="intro">
            AgentClinic helps people find the right care and coordinate it with AI
            agents and clinic staff.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a href="#agents" className="primary-link">
              Explore agents
            </a>
            <a href="#care-flow" className="secondary-link">
              Review care flow
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Clinic snapshot">
          {careHighlights.map((highlight) => (
            <div key={highlight.label} className="stat-card">
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          ))}
        </aside>
      </section>

      <section id="agents" className="content-panel" aria-labelledby="agents-heading">
        <div className="panel-heading">
          <p className="eyebrow">Overview</p>
          <h2 id="agents-heading">Agents and shared context</h2>
        </div>
        <div className="card-grid">
          <article className="info-card">
            <h3>Support workflows</h3>
            <p>
              Keep a clear, shared view of each user need so agents and staff can
              respond in the right order.
            </p>
          </article>
          <article className="info-card">
            <h3>Friendly intake</h3>
            <p>
              Make it easy to understand symptoms, care needs, and next actions
              without creating unnecessary friction.
            </p>
          </article>
          <article className="info-card">
            <h3>Reliable follow-up</h3>
            <p>
              Coordinate updates and scheduling so the right person sees the right
              status at the right time.
            </p>
          </article>
        </div>
      </section>

      <section id="care-flow" className="content-panel panel-split" aria-labelledby="care-flow-heading">
        <div>
          <p className="eyebrow">Care flow</p>
          <h2 id="care-flow-heading">From intake to appointment</h2>
        </div>
        <ol className="timeline" aria-label="Care coordination timeline">
          <li>
            <span>01</span>
            <div>
              <h3>Review needs</h3>
              <p>Capture symptoms, context, and urgency in a single place.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Match care</h3>
              <p>Surface the right therapies and appointments for the situation.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Coordinate follow-up</h3>
              <p>Share updates with the user, agents, and clinic staff.</p>
            </div>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default MainContent;

import { useEffect, useState } from 'react';
import {
  createSampleClinicDataSource,
  type Agent,
  type Appointment,
  type AppointmentSlot,
  type ClinicData,
  type ClinicDataSource,
} from '../data/clinic';

type MainContentProps = {
  dataSource?: ClinicDataSource;
};

type DashboardStatProps = {
  label: string;
  value: number;
};

type AgentCardProps = {
  agent: Agent;
  onOpen: (agentId: string) => void;
};

type AppointmentRowProps = {
  appointment: Appointment;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: ClinicData };

type BookingStage = 'select' | 'review' | 'confirmed';

const defaultDataSource = createSampleClinicDataSource();

function formatDate(date: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
}

function DashboardStat({ label, value }: DashboardStatProps) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function AgentCard({ agent, onOpen }: AgentCardProps) {
  return (
    <article className="agent-card">
      <p className="eyebrow">{agent.specialty}</p>
      <h3>{agent.name}</h3>
      <p>{agent.summary}</p>
      <p className="agent-meta">
        {agent.ailments.length} care topics · {agent.therapies.length} therapy resources
      </p>
      <button className="outline" type="button" onClick={() => onOpen(agent.id)}>
        Open {agent.name}&apos;s profile
      </button>
    </article>
  );
}

function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <li className="appointment-row">
      <div>
        <strong>{appointment.agentName}</strong>
        <span>{formatDate(appointment.date)} at {formatTime(appointment.time)}</span>
      </div>
      <span className="status-badge">{appointment.status}</span>
    </li>
  );
}

function MainContent({ dataSource = defaultDataSource }: MainContentProps) {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' });
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [bookingStage, setBookingStage] = useState<BookingStage>('select');
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  async function loadData() {
    setLoadState({ status: 'loading' });
    try {
      const data = await dataSource.load();
      setLoadState({ status: 'ready', data });
    } catch {
      setLoadState({
        status: 'error',
        message: 'We could not load the clinic overview. Please try again.',
      });
    }
  }

  useEffect(() => {
    void loadData();
  }, [dataSource]);

  function openAgent(agentId: string) {
    setSelectedAgentId(agentId);
    setSelectedSlotId(null);
    setBookingStage('select');
    setBookingError(null);
    setConfirmedAppointment(null);
  }

  async function confirmBooking(agent: Agent, slot: AppointmentSlot) {
    setBookingError(null);
    setIsBooking(true);
    try {
      const result = await dataSource.book(agent.id, slot.id);
      if (result.status === 'unavailable') {
        setBookingError('That time is no longer available. Choose another sample time.');
        setBookingStage('select');
        setSelectedSlotId(null);
        setLoadState((current) =>
          current.status === 'ready'
            ? {
                status: 'ready',
                data: {
                  ...current.data,
                  slots: current.data.slots.map((item) =>
                    item.id === slot.id ? { ...item, available: false } : item,
                  ),
                },
              }
            : current,
        );
        return;
      }

      setConfirmedAppointment(result.appointment);
      setLoadState((current) =>
        current.status === 'ready'
          ? {
              status: 'ready',
              data: {
                ...current.data,
                slots: current.data.slots.map((item) =>
                  item.id === slot.id ? { ...item, available: false } : item,
                ),
                appointments: [...current.data.appointments, result.appointment],
              },
            }
          : current,
      );
      setBookingStage('confirmed');
    } catch {
      setBookingError('We could not confirm this sample booking. Your selection is still here; please try again.');
    } finally {
      setIsBooking(false);
    }
  }

  if (loadState.status === 'loading') {
    return (
      <main>
        <section className="content-panel state-panel" aria-live="polite">
          <p className="eyebrow">Agent and staff workspace</p>
          <h1>Loading clinic overview</h1>
          <p>Loading illustrative sample information…</p>
          <progress aria-label="Loading clinic information" />
        </section>
      </main>
    );
  }

  if (loadState.status === 'error') {
    return (
      <main>
        <section className="content-panel state-panel" aria-labelledby="load-error-heading">
          <p className="eyebrow">Agent and staff workspace</p>
          <h1 id="load-error-heading">Clinic overview unavailable</h1>
          <p role="alert">{loadState.message}</p>
          <button type="button" onClick={() => void loadData()}>Try again</button>
        </section>
      </main>
    );
  }

  const { data } = loadState;
  const selectedAgent = data.agents.find((agent) => agent.id === selectedAgentId);
  const selectedSlot = data.slots.find((slot) => slot.id === selectedSlotId);

  return (
    <main>
      <section id="overview" className="hero" aria-labelledby="overview-heading">
        <div className="hero-copy">
          <p className="eyebrow">Agent and staff workspace</p>
          <h1 id="overview-heading">Clinic overview</h1>
          <p className="intro">
            A shared starting point to explore care context and coordinate a sample appointment.
          </p>
        </div>
        <aside className="hero-panel" aria-label="Illustrative dashboard summary">
          <p className="sample-note">Illustrative sample data — not live clinic information.</p>
          <DashboardStat label="Agents supported" value={data.agents.length} />
          <DashboardStat label="Staff appointments" value={data.appointments.length} />
          <DashboardStat label="Available sample times" value={data.slots.filter((slot) => slot.available).length} />
        </aside>
      </section>

      <section className="content-panel" aria-labelledby="workspaces-heading">
        <div className="panel-heading">
          <p className="eyebrow">Quick access</p>
          <h2 id="workspaces-heading">Where would you like to go?</h2>
        </div>
        <div className="card-grid">
          <a href="#agents" className="info-card access-card">
            <h3>Agent directory</h3>
            <p>Browse sample profiles and their shared care context.</p>
            <span className="access-action">Explore agents <span aria-hidden="true">→</span></span>
          </a>
          <a href="#appointments" className="info-card access-card">
            <h3>Staff appointments</h3>
            <p>Review the sample appointments in the clinic workspace.</p>
            <span className="access-action">View appointments <span aria-hidden="true">→</span></span>
          </a>
          <a href="#contact" className="info-card access-card">
            <h3>Clinic staff</h3>
            <p>Reach the clinic team for help with coordination.</p>
            <span className="access-action">Contact the clinic <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <section id="agents" className="content-panel" aria-labelledby="agents-heading">
        <div className="panel-heading">
          <p className="eyebrow">Sample directory</p>
          <h2 id="agents-heading">Agents and shared care context</h2>
        </div>
        {data.agents.length === 0 ? (
          <div className="empty-state">
            <h3>No agents to show yet</h3>
            <p>The sample directory is empty. Check back when sample profiles are available.</p>
          </div>
        ) : (
          <div className="card-grid">
            {data.agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onOpen={openAgent} />
            ))}
          </div>
        )}
      </section>

      {selectedAgent && (
        <section className="content-panel profile-panel" aria-labelledby="profile-heading">
          <div className="panel-heading">
            <p className="eyebrow">Illustrative agent profile</p>
            <h2 id="profile-heading">{selectedAgent.name}</h2>
            <p className="section-description">{selectedAgent.specialty}. {selectedAgent.summary}</p>
          </div>
          <div className="care-grid">
            <section aria-labelledby="ailments-heading">
              <h3 id="ailments-heading">Shared care topics</h3>
              {selectedAgent.ailments.length === 0 ? (
                <p>No sample care topics are listed for this profile.</p>
              ) : (
                <ul className="detail-list">
                  {selectedAgent.ailments.map((ailment) => (
                    <li key={ailment.id}>
                      <strong>{ailment.name}</strong>
                      <span>{ailment.summary}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section aria-labelledby="therapies-heading">
              <h3 id="therapies-heading">Therapy information</h3>
              <p className="sample-note">General information only; not a diagnosis or recommendation.</p>
              {selectedAgent.therapies.length === 0 ? (
                <p>No sample therapy information is listed for this profile.</p>
              ) : (
                <ul className="detail-list">
                  {selectedAgent.therapies.map((therapy) => (
                    <li key={therapy.id}>
                      <strong>{therapy.name}</strong>
                      <span>{therapy.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="booking-panel" aria-labelledby="booking-heading">
            <div className="panel-heading">
              <p className="eyebrow">Sample scheduling</p>
              <h3 id="booking-heading">Choose an available time</h3>
            </div>
            {bookingStage === 'confirmed' && confirmedAppointment ? (
              <div className="success-state" role="status">
                <h4>Sample appointment confirmed</h4>
                <p>
                  {confirmedAppointment.agentName} — {formatDate(confirmedAppointment.date)} at{' '}
                  {formatTime(confirmedAppointment.time)}.
                </p>
                <p>This confirmation exists only for this session and is not saved.</p>
                <button className="outline" type="button" onClick={() => setBookingStage('select')}>
                  Choose another sample time
                </button>
              </div>
            ) : bookingStage === 'review' && selectedSlot ? (
              <div className="booking-review" aria-labelledby="review-heading">
                <h4 id="review-heading">Review before confirming</h4>
                <dl>
                  <div><dt>Agent</dt><dd>{selectedAgent.name}</dd></div>
                  <div><dt>Date</dt><dd>{formatDate(selectedSlot.date)}</dd></div>
                  <div><dt>Time</dt><dd>{formatTime(selectedSlot.time)}</dd></div>
                  <div><dt>Care context</dt><dd>{selectedAgent.ailments.map((item) => item.name).join(', ') || 'No sample topics listed'}</dd></div>
                  <div><dt>Therapy information</dt><dd>{selectedAgent.therapies.map((item) => item.name).join(', ') || 'No sample therapy information listed'}</dd></div>
                </dl>
                {bookingError && <p role="alert" className="error-message">{bookingError}</p>}
                <div className="button-row">
                  <button className="outline" type="button" onClick={() => {
                    setBookingStage('select');
                    setBookingError(null);
                  }}>Choose another time</button>
                  <button type="button" onClick={() => void confirmBooking(selectedAgent, selectedSlot)} disabled={isBooking}>
                    {isBooking ? 'Confirming…' : bookingError ? 'Try confirmation again' : 'Confirm sample appointment'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="sample-note">Sample availability only — these times are not live clinic slots.</p>
                {data.slots.length === 0 ? (
                  <p>No sample appointment times are available.</p>
                ) : (
                  <div className="slot-grid">
                    {data.slots.map((slot) => (
                      <button
                        key={slot.id}
                        className={slot.available ? 'outline slot-button' : 'outline slot-button unavailable-slot'}
                        type="button"
                        disabled={!slot.available}
                        aria-label={`${slot.available ? 'Select' : 'Unavailable'} sample appointment time: ${formatDate(slot.date)} at ${formatTime(slot.time)}`}
                        aria-pressed={selectedSlotId === slot.id}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setBookingError(null);
                        }}
                      >
                        {formatDate(slot.date)} · {formatTime(slot.time)}
                        {!slot.available && ' — Unavailable'}
                      </button>
                    ))}
                  </div>
                )}
                {bookingError && <p role="alert" className="error-message">{bookingError}</p>}
                {selectedSlot && (
                  <div className="button-row">
                    <button type="button" onClick={() => {
                      setBookingStage('review');
                      setBookingError(null);
                    }}>Review appointment</button>
                  </div>
                )}
              </>
            )}
          </section>
        </section>
      )}

      <section id="appointments" className="content-panel" aria-labelledby="appointments-heading">
        <div className="panel-heading">
          <p className="eyebrow">Staff workspace</p>
          <h2 id="appointments-heading">Sample appointments</h2>
          <p className="sample-note">Illustrative appointment information for clinic staff.</p>
        </div>
        {data.appointments.length === 0 ? (
          <div className="empty-state">
            <h3>No sample appointments yet</h3>
            <p>Confirmed sample bookings will appear here for staff to review.</p>
          </div>
        ) : (
          <ul className="appointment-list">
            {data.appointments.map((appointment) => (
              <AppointmentRow key={appointment.id} appointment={appointment} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default MainContent;

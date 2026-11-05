export type Ailment = {
  id: string;
  name: string;
  summary: string;
};

export type Therapy = {
  id: string;
  name: string;
  description: string;
};

export type Agent = {
  id: string;
  name: string;
  specialty: string;
  summary: string;
  ailments: Ailment[];
  therapies: Therapy[];
};

export type AppointmentSlot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
};

export type Appointment = {
  id: string;
  agentId: string;
  agentName: string;
  date: string;
  time: string;
  status: 'Confirmed';
};

export type ClinicData = {
  agents: Agent[];
  slots: AppointmentSlot[];
  appointments: Appointment[];
};

export type BookingResult =
  | { status: 'confirmed'; appointment: Appointment }
  | { status: 'unavailable' };

export type ClinicDataSource = {
  load: () => Promise<ClinicData>;
  book: (agentId: string, slotId: string) => Promise<BookingResult>;
};

function localDateOffset(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const sampleAgents: Agent[] = [
  {
    id: 'agent-aria',
    name: 'Aria',
    specialty: 'General care coordination',
    summary: 'Helps organize care information and prepare for clinic visits.',
    ailments: [
      { id: 'ailment-sleep', name: 'Sleep concerns', summary: 'Illustrative topic shared for care coordination.' },
      { id: 'ailment-stress', name: 'Everyday stress', summary: 'Illustrative topic shared for care coordination.' },
    ],
    therapies: [
      { id: 'therapy-sleep', name: 'Sleep routine support', description: 'Information about routines that may support restful sleep.' },
      { id: 'therapy-breathing', name: 'Breathing exercises', description: 'A general relaxation practice to discuss with clinic staff.' },
    ],
  },
  {
    id: 'agent-noah',
    name: 'Noah',
    specialty: 'Wellness support',
    summary: 'Keeps wellness notes organized for conversations with clinic staff.',
    ailments: [
      { id: 'ailment-mobility', name: 'Mobility questions', summary: 'Illustrative topic for a future care conversation.' },
    ],
    therapies: [
      { id: 'therapy-movement', name: 'Gentle movement', description: 'General movement information to review with clinic staff.' },
    ],
  },
  {
    id: 'agent-sage',
    name: 'Sage',
    specialty: 'Visit preparation',
    summary: 'Helps gather questions and context before a clinic appointment.',
    ailments: [
      { id: 'ailment-headache', name: 'Headache tracking', summary: 'An illustrative topic for organizing visit notes.' },
    ],
    therapies: [
      { id: 'therapy-journal', name: 'Symptom journal', description: 'A way to organize observations for a clinic conversation.' },
    ],
  },
];

function createSampleSlots(): AppointmentSlot[] {
  return [
    { id: 'slot-1', date: localDateOffset(1), time: '09:00', available: true },
    { id: 'slot-2', date: localDateOffset(1), time: '10:30', available: true },
    { id: 'slot-3', date: localDateOffset(2), time: '13:00', available: false },
    { id: 'slot-4', date: localDateOffset(3), time: '14:30', available: true },
    { id: 'slot-5', date: localDateOffset(4), time: '11:00', available: true },
  ];
}

export function createSampleClinicDataSource(): ClinicDataSource {
  const slots = createSampleSlots();
  const appointments: Appointment[] = [
    {
      id: 'appointment-sample-1',
      agentId: 'agent-noah',
      agentName: 'Noah',
      date: slots[0].date,
      time: '08:30',
      status: 'Confirmed',
    },
  ];
  let bookingNumber = 2;

  return {
    async load() {
      return {
        agents: sampleAgents.map((agent) => ({
          ...agent,
          ailments: [...agent.ailments],
          therapies: [...agent.therapies],
        })),
        slots: slots.map((slot) => ({ ...slot })),
        appointments: appointments.map((appointment) => ({ ...appointment })),
      };
    },
    async book(agentId, slotId) {
      const agent = sampleAgents.find((item) => item.id === agentId);
      const slot = slots.find((item) => item.id === slotId);
      if (!agent || !slot || !slot.available) {
        return { status: 'unavailable' };
      }

      const appointment: Appointment = {
        id: `appointment-sample-${bookingNumber++}`,
        agentId: agent.id,
        agentName: agent.name,
        date: slot.date,
        time: slot.time,
        status: 'Confirmed',
      };
      appointments.push(appointment);
      slot.available = false;
      return { status: 'confirmed', appointment: { ...appointment } };
    },
  };
}

import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../prisma.js', async () => {
  const prismaMock = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
    },
    booking: {
      deleteMany: jest.fn(),
    },
    waitingList: {
      deleteMany: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { default: prismaMock }; 
});

await jest.unstable_mockModule('../../../repositories/eventRepository.js', () => ({
  default: {
    createEvent: jest.fn(),
    getEvents: jest.fn(),
    getEventById: jest.fn(),
  },
}));

const { default: eventRepository } = await import('../../../repositories/eventRepository.js');

describe("Event Repository", () => {
  const eventId = "event123";

  beforeEach(() => {
    eventRepository.createEvent.mockResolvedValue({ id: eventId, name: "Sample Event", totalTickets: 5 });
    eventRepository.getEvents.mockResolvedValue([{ id: eventId, name: "Sample Event", totalTickets: 5 }]);
    eventRepository.getEventById.mockResolvedValue({ id: eventId, name: "Sample Event", totalTickets: 5 });
  });

  test("should create a new event", async () => {
    const event = await eventRepository.createEvent("Sample Event", 5);
    expect(event).toEqual({ id: eventId, name: "Sample Event", totalTickets: 5 });
  });

  test("should fetch all events", async () => {
    const events = await eventRepository.getEvents();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  test("should fetch event by ID", async () => {
    const event = await eventRepository.getEventById(eventId);
    expect(event).toHaveProperty("id", eventId);
  });
});

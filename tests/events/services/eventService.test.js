import { jest } from '@jest/globals';

await jest.unstable_mockModule('../../../repositories/eventRepository.js', () => ({
  default: {
    createEvent: jest.fn(),
    bookTicket: jest.fn(),
    cancelBooking: jest.fn(),
  },
}));

const { default: eventRepository } = await import('../../../repositories/eventRepository.js');
const { default: eventService } = await import('../../../services/eventService.js');

describe("Event Service", () => {
  const eventId = "test-event-id";
  const userId = "test-user-id";

  beforeEach(() => {
    eventRepository.createEvent.mockResolvedValue({ id: eventId, name: "Mock Event", totalTickets: 10, availableTickets: 10 });
    eventRepository.bookTicket.mockResolvedValue({ message: "Ticket booked successfully" });
    eventRepository.cancelBooking.mockResolvedValue({ message: "Booking cancelled and reassigned if applicable" });
  });

  test("should initialize an event", async () => {
    const event = await eventService.initializeEvent("Mock Event", 10);
    expect(event.id).toBe(eventId);
    expect(event.name).toBe("Mock Event");
  });

  test("should book a ticket", async () => {
    const response = await eventService.bookTicket(eventId, userId);
    expect(response.message).toBe("Ticket booked successfully");
  });

  test("should cancel a booking", async () => {
    const response = await eventService.cancelBooking(eventId, userId);
    expect(response.message).toBe("Booking cancelled and reassigned if applicable");
  });
});

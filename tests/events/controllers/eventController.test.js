import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../../../index.js';
import prisma from '../../../prisma.js';

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

describe("Event Controller API", () => {
  let eventId;
  const userId = "user123";

  beforeAll(async () => {
    const response = await request(app)
      .post("/api/v1/initialize")
      .send({ name: "Test Event", totalTickets: 10 });
    eventId = response.body.id;
  });

  afterAll(async () => {
    await prisma.booking.deleteMany();
    await prisma.waitingList.deleteMany();
    await prisma.event.deleteMany();
    await prisma.$disconnect();
  });

  test("POST /initialize - should create an event", async () => {
    const response = await request(app)
      .post("/api/v1/initialize")
      .send({ name: "Another Event", totalTickets: 20 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Another Event");
  });

  test("POST /book - should book a ticket", async () => {
    const response = await request(app)
      .post("/api/v1/book")
      .send({ eventId, userId });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket booked successfully");
  });

  test("POST /cancel - should cancel a booking", async () => {
    const response = await request(app)
      .post("/api/v1/cancel")
      .send({ eventId, userId });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Booking cancelled and reassigned if applicable");
  });

  test("GET /status/:eventId - should return event status", async () => {
    const response = await request(app).get(`/api/v1/status/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("availableTickets");
    expect(response.body).toHaveProperty("waitingList");
  });
});

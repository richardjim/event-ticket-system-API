import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const createEvent = async (name, totalTickets) => {
  return await prisma.event.create({
    data: { name, totalTickets, availableTickets: totalTickets },
  });
};

const getEvents = async () => {
    return await prisma.event.findMany();
  };

const getEventById = async (eventId) => {
  return await prisma.event.findUnique({
    where: { id: eventId },
    include: { bookings: true, waitingList: true },
  });
};

const bookTicket = async (eventId, userId) => {
  return await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({ where: { id: eventId } });
    
    if (!event || event.availableTickets <= 0) {
      throw new Error("Tickets are sold out");
    }

    await tx.booking.create({
      data: { eventId, userId },
    });

    await tx.event.update({
      where: { id: eventId },
      data: { availableTickets: event.availableTickets - 1 },
    });

    return { message: "Ticket booked successfully" };
  });
};

const addToWaitingList = async (eventId, userId) => {
  return await prisma.waitingList.create({
    data: { eventId, userId },
  });
};

const cancelBooking = async (eventId, userId) => {
  return await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findFirst({
      where: { eventId, userId },
    });

    if (!booking) throw new Error("Booking not found");

    await tx.booking.delete({ where: { id: booking.id } });

    let nextInLine = await tx.waitingList.findFirst({
      where: { eventId },
      orderBy: { createdAt: "asc" },
    });

    if (nextInLine) {
      await tx.booking.create({ data: { eventId, userId: nextInLine.userId } });
      await tx.waitingList.delete({ where: { id: nextInLine.id } });
    } else {
      await tx.event.update({
        where: { id: eventId },
        data: { availableTickets: { increment: 1 } },
      });
    }

    return { message: "Booking cancelled and reassigned if applicable" };
  });
};

const getEventStatus = async (eventId) => {
  return await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      bookings: true,
      waitingList: true,
    },
  });
};

export default {
    getEventStatus,
    createEvent,
    cancelBooking,
    addToWaitingList,
    bookTicket,
    getEventById,
    getEvents
}

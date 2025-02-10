import eventRepository from "../repositories/eventRepository.js";

const initializeEvent = async (name, totalTickets) => {
  return await eventRepository.createEvent(name, totalTickets);
};

const bookTicket = async (eventId, userId) => {
  try {
    return await eventRepository.bookTicket(eventId, userId);
  } catch (error) {
    return await eventRepository.addToWaitingList(eventId, userId);
  }
};

const cancelBooking = async (eventId, userId) => {
  return await eventRepository.cancelBooking(eventId, userId);
};

const getEventList = async (eventId) => {
  return await eventRepository.getEventStatus(eventId);
};

const getEventLists = async () => {
    return await eventRepository.getEvents();
  };

  export default  {
    initializeEvent,
    getEventList,
    getEventLists,
    cancelBooking,
    bookTicket
  }

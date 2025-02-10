const eventRepository = require("../repositories/eventRepository");

exports.initializeEvent = async (name, totalTickets) => {
  return await eventRepository.createEvent(name, totalTickets);
};

exports.bookTicket = async (eventId, userId) => {
  try {
    return await eventRepository.bookTicket(eventId, userId);
  } catch (error) {
    return await eventRepository.addToWaitingList(eventId, userId);
  }
};

exports.cancelBooking = async (eventId, userId) => {
  return await eventRepository.cancelBooking(eventId, userId);
};

exports.getEventStatus = async (eventId) => {
  return await eventRepository.getEventStatus(eventId);
};

exports.getEventList = async () => {
    return await eventRepository.getEvents();
  };

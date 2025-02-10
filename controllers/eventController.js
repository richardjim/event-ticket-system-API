import eventService from "../services/eventService.js";

const initializeEvent = async (req, res) => {
  try {
    const { name, totalTickets } = req.body;
    const event = await eventService.initializeEvent(name, totalTickets);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bookTicket = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const result = await eventService.bookTicket(eventId, userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const result = await eventService.cancelBooking(eventId, userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const status = await eventService.getEventList(eventId);
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvents = async (req,res) => {
    try {
       await eventService.getEventList();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    initializeEvent,
    bookTicket,
    cancelBooking,
    getEventStatus,
    getEvents,
  };
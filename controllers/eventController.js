const eventService = require("../services/eventService");

exports.initializeEvent = async (req, res) => {
  try {
    const { name, totalTickets } = req.body;
    const event = await eventService.initializeEvent(name, totalTickets);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.bookTicket = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const result = await eventService.bookTicket(eventId, userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const result = await eventService.cancelBooking(eventId, userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const status = await eventService.getEventStatus(eventId);
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvents = async (req,res) => {
    try {
       await eventService.getEventList();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

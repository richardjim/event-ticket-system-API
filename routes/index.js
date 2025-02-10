const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Health.
 *     responses:
 *       200:
 *         description: success
 */
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Booking System is running" });
});

/**
 * @swagger
 * /initialize:
 *   post:
 *     summary: Initialize a new event
 *     description: Create an event with a given number of tickets.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Conference 2025"
 *               totalTickets:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Server error
 */
router.post("/initialize", eventController.initializeEvent);

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Book a ticket for a user
 *     description: Attempt to book a ticket; if sold out, add user to waiting list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "f12e9b2c-3c79-4bc1-9fcd-4f76a5437ad1"
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Ticket booked successfully or added to waiting list
 *       500:
 *         description: Server error
 */
router.post("/book", eventController.bookTicket);

/**
 * @swagger
 * /cancel:
 *   post:
 *     summary: Cancel a booking
 *     description: Cancel a user's booking and reassign if a waiting list exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: "f12e9b2c-3c79-4bc1-9fcd-4f76a5437ad1"
 *               userId:
 *                 type: string
 *                 example: "user123"
 *     responses:
 *       200:
 *         description: Booking canceled and reassigned if applicable
 *       500:
 *         description: Server error
 */
router.post("/cancel", eventController.cancelBooking);

/**
 * @swagger
 * /status/{eventId}:
 *   get:
 *     summary: Get event status
 *     description: Retrieve the current status of an event, including available tickets and waiting list count.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *           example: "f12e9b2c-3c79-4bc1-9fcd-4f76a5437ad1"
 *     responses:
 *       200:
 *         description: Event status retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/status/:eventId", eventController.getEventStatus);

module.exports = router;

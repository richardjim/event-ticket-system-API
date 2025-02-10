# Event Ticket Booking API

A Node.js REST API for an event ticket booking system with waiting list management.

## Features
- Initialize an event with a set number of tickets.
- Allow users to book tickets concurrently.
- Maintain a waiting list when tickets are sold out.
- Handle ticket cancellations and automatic assignment to waiting users.
- Provide event status with available tickets and waiting list count.
- Swagger API documentation.

## Tech Stack
- Node.js with Express.js
- Prisma ORM with PostgreSQL
- Swagger for API documentation
- Jest for testing

## Installation
```sh
git clone https://github.com/richardjim/event-ticket-system-API.git
cd event-ticket-booking
npm install

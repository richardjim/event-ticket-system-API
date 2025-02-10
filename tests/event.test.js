const request = require('supertest');
const app = require('../index'); 

describe('Event API', () => {
  it('should initialize an event', async () => {
    const response = await request(app).post('/api/v1/initialize').send({
      name: 'Music Concert',
      totalTickets: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Music Concert');
  });

  it('should book a ticket', async () => {
    const event = await request(app).post('/api/v1/initialize').send({
      name: 'Music Concert',
      totalTickets: 100,
    });
    const response = await request(app).post('/api/v1/book').send({
      eventId: event.body.id,
      userId: 'user123',
    });
    expect(response.status).toBe(200);
    expect(response.body.userId).toBe('user123');
  });

});

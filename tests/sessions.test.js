const request = require('supertest');
const app = require('../server');
const { connectDB, getDB, closeDB } = require('../db/connection');
const { ObjectId } = require('mongodb');

beforeAll(async () => {
  await connectDB();
});

describe('Workout Sessions GET endpoints', () => {
  let sessionId;

  beforeAll(async () => {
    const result = await getDB().collection('sessions').insertOne({
      memberId: new ObjectId(),
      trainerId: new ObjectId(),
      sessionDate: '2026-08-12',
      startTime: '10:00',
      durationMinutes: 60,
      workoutType: 'Strength Training',
      notes: 'Test session',
      status: 'scheduled'
    });

    sessionId = result.insertedId.toString();
  });

  afterAll(async () => {
    await getDB()
      .collection('sessions')
      .deleteOne({ _id: new ObjectId(sessionId) });
      await closeDB();
  });

  test('GET /sessions should return 200', async () => {
    const response = await request(app).get('/sessions');

    expect(response.statusCode).toBe(200);
  });

  test('GET /sessions should return an array', async () => {
    const response = await request(app).get('/sessions');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /sessions/:id should return one session', async () => {
    const response = await request(app).get(`/sessions/${sessionId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.workoutType).toBe('Strength Training');
  });

  test('GET /sessions/:id with invalid ID should return 400', async () => {
    const response = await request(app).get('/sessions/invalid-id');

    expect(response.statusCode).toBe(400);
  });
});
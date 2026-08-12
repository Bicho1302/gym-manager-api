const request = require('supertest');
const app = require('../server');
const { connectDB, getDB, closeDB } = require('../db/connection');
const { ObjectId } = require('mongodb');

beforeAll(async () => {
  await connectDB();
});

describe('Membership Plans GET endpoints', () => {
  let planId;

  beforeAll(async () => {
    const result = await getDB().collection('plans').insertOne({
      name: 'Test Plan',
      description: 'Plan created for unit testing',
      monthlyPrice: 25,
      durationMonths: 1,
      accessLevel: 'basic',
      isActive: true
    });

    planId = result.insertedId.toString();
  });

  afterAll(async () => {
    await getDB()
      .collection('plans')
      .deleteOne({ _id: new ObjectId(planId) });
      await closeDB();
  });

  test('GET /plans should return 200', async () => {
    const response = await request(app).get('/plans');

    expect(response.statusCode).toBe(200);
  });

  test('GET /plans should return an array', async () => {
    const response = await request(app).get('/plans');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /plans/:id should return one plan', async () => {
    const response = await request(app).get(`/plans/${planId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Test Plan');
  });

  test('GET /plans/:id with invalid ID should return 400', async () => {
    const response = await request(app).get('/plans/invalid-id');

    expect(response.statusCode).toBe(400);
  });
});
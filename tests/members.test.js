const request = require('supertest');
const app = require('../server');
const { connectDB, getDB, closeDB } = require('../db/connection');

beforeAll(async () => {
  await connectDB();
});

describe('Members GET endpoints', () => {
  let memberId;

  beforeAll(async () => {
    const result = await getDB().collection('members').insertOne({
      firstName: 'Test',
      lastName: 'Member',
      email: 'test.member@example.com',
      phone: '801-555-1111',
      dateOfBirth: '1995-01-01',
      membershipPlanId: null,
      joinDate: '2026-08-11',
      membershipStatus: 'active',
      emergencyContact: 'Test Contact',
      assignedTrainerId: null
    });

    memberId = result.insertedId.toString();
  });

  afterAll(async () => {
    await getDB()
      .collection('members')
      .deleteOne({ _id: require('mongodb').ObjectId.createFromHexString(memberId) });
      await closeDB();
  });

  test('GET /members should return 200', async () => {
    const response = await request(app).get('/members');

    expect(response.statusCode).toBe(200);
  });

  test('GET /members should return an array', async () => {
    const response = await request(app).get('/members');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /members/:id should return one member', async () => {
    const response = await request(app).get(`/members/${memberId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe('Test');
  });

  test('GET /members/:id with invalid ID should return 400', async () => {
    const response = await request(app).get('/members/invalid-id');

    expect(response.statusCode).toBe(400);
  });
});
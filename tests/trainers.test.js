const request = require('supertest');
const app = require('../server');
const { connectDB, getDB, closeDB } = require('../db/connection');
const { ObjectId } = require('mongodb');

beforeAll(async () => {
  await connectDB();
});

describe('Trainers GET endpoints', () => {
  let trainerId;

  beforeAll(async () => {
    const result = await getDB().collection('trainers').insertOne({
      firstName: 'Test',
      lastName: 'Trainer',
      email: 'test.trainer@example.com',
      phone: '801-555-2222',
      specialty: 'Strength Training',
      yearsOfExperience: 3,
      availability: 'Monday-Friday'
    });

    trainerId = result.insertedId.toString();
  });

  afterAll(async () => {
    await getDB()
      .collection('trainers')
      .deleteOne({ _id: new ObjectId(trainerId) });
  });

  test('GET /trainers should return 200', async () => {
    const response = await request(app).get('/trainers');

    expect(response.statusCode).toBe(200);
  });

  test('GET /trainers should return an array', async () => {
    const response = await request(app).get('/trainers');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /trainers/:id should return one trainer', async () => {
    const response = await request(app).get(`/trainers/${trainerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe('Test');
  });

  test('GET /trainers/:id with invalid ID should return 400', async () => {
    const response = await request(app).get('/trainers/invalid-id');

    expect(response.statusCode).toBe(400);
  });
});
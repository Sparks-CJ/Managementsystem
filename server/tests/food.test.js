import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import FoodItem from '../src/models/FoodItem.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await FoodItem.deleteMany({});
});

describe('Food API', () => {
  it('creates a food item', async () => {
    const res = await request(app).post('/api/food').send({ name: 'Rice', category: 'Grains', quantity: 5 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Rice');
  });

  it('lists items', async () => {
    await FoodItem.create({ name: 'Beans', category: 'Legumes' });
    const res = await request(app).get('/api/food');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

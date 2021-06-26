import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';
import { getConnection } from 'typeorm';

describe('Tags', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })


  it('should be able to create a tag with an admin user', async () => {
    await request(app).post('/users').send({
      name: "admin",
      email: "admin@foo.com",
      password: "123456",
      admin: true
    });

    const token = await request(app).post('/login').send({
      email: "admin@foo.com",
      password: "123456"
    });

    const bearerToken = token.body;


  })

})
import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';
import { getConnection } from 'typeorm';


describe('Users', () => {
  beforeAll(async () => {
    if (getConnection()) {
      const connection = await createConnection();
      await connection.runMigrations();
    }
  });

  afterAll(async () => {
    await getConnection().close();
  })

  afterEach(async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    })
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: "johnfoo",
      email: "john@foo.com",
      password: "123456",
      admin: false
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it('should not be able to create a new user with same email address', async () => {
    await request(app).post('/users').send({
      name: "johnfoo 1",
      email: "john@foo.com",
      password: "123456",
      admin: false
    });

    const response = await request(app).post('/users').send({
      name: "johnfoo 2",
      email: "john@foo.com",
      password: "123456",
      admin: false
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it('should be able to login user with email and password', async () => {
    await request(app).post('/users').send({
      name: "johnfoo",
      email: "john@foo.com",
      password: "123456",
      admin: false
    });

    const response = await request(app).post('/login').send({
      email: "john@foo.com",
      password: "123456"
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy;
  });

  it('should not be able to login user with a nonexistent email', async () => {
    const response = await request(app).post('/login').send({
      email: "foo@john.com",
      password: "emptypassword"
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy;
  });

  it('should not be able to login user with a wrong password', async () => {
    const response = await request(app).post('/login').send({
      email: "john@foo.com",
      password: "wrongpassword"
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy;
  });

});
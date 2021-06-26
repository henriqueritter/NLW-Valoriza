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

    const bearerToken = "bearer " + token.body;

    const response = await request(app)
      .post('/tags')
      .set({ Authorization: bearerToken })
      .send({
        email: 'admin@foo.com', name: 'Tag Example'
      });

    expect(response.status).toBe(201);
  })

})
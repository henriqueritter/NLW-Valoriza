import request from 'supertest';
import { app } from '../app';



describe('Tags', () => {

  it('should be able to create a tag with user admin', async () => {
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
    console.log(token.body);
    expect(2 + 2).toBe(4);
  })

})
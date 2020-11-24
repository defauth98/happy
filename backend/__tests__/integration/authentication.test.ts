import request from 'supertest';
import { app } from '../../src/app';
import { createConnection } from 'typeorm';

describe('Autenticação', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: './__tests__/database.sqlite',
      entities: ['./src/models/*.ts'],
    });
  });

  it('should create a user with valid credentials', async () => {
    const response = await request(app).post('/sign').send({
      email: 'neto.daniribeiro@gmail.com',
      password: '123123',
    });
    expect(response.status).toBe(201);
  });

  it('should not create a user with a invalid e-mail', async () => {
    const response = await request(app).post('/sign').send({
      email: 'neto',
      password: '123123',
    });
    expect(response.status).toBe(400);
  });

  it('should not create a user with a password less then 6 characters', async () => {
    const response = await request(app).post('/sign').send({
      email: 'neto.daniribeiro@gmail.com',
      password: '123',
    });
    expect(response.status).toBe(400);
  });

  it('should a give a jwt token when accont is created', async () => {
    const response = await request(app).post('/sign').send({
      email: 'ribeirodaniel@gmail.com',
      password: '123123',
    });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(201);
  });

  it('should login with a valid credentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'neto.daniribeiro@gmail.com',
      password: '123123',
    });
    expect(response.status).toBe(200);
  });

  it('should validate a valid email address', async () => {
    const response = await request(app).post('/validade-email').send({
      email: 'neto.daniribeiro@gmail.com',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('passwordResetToken');
    expect(response.body).toHaveProperty('passwordResetExpires');
  });

  it('should update a user password', async () => {
    const validateEmailResponse = await request(app)
      .post('/validade-email')
      .send({
        email: 'neto.daniribeiro@gmail.com',
      });

    const response = await request(app)
      .post('/recovery-password')
      .query({
        token: validateEmailResponse.body.passwordResetToken,
      })
      .send({
        password: '456456',
      });

    expect(response.status).toBe(200);
  });

  it('should not update a user password', async () => {
    const response = await request(app).post('/recovery-password').send({
      password: '456456',
    });

    expect(response.status).toBe(400);
  });
});

import request from 'supertest';
import { createConnection } from 'typeorm';
import { app } from '../../src/app';

import Images from '../../src/models/Images';
import User from '../../src/models/Users';
import Orphanages from '../../src/models/Orphanages';

import factory from '../factories';

describe('Sessions', () => {
  beforeAll(async () => {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'happy',
      entities: [Images, User, Orphanages],
    });
  });

  it('should not validade a invalid email', async () => {
    const response = await request(app).post('/validade-email').send({
      email: 'neto.ribeiroedaniel@gmail.com',
    });

    expect(response.status).toBe(400);
  });

  it('should  validade a invalid email', async () => {
    const response = await request(app).post('/validade-email').send({
      email: 'neto.daniribeiro@gmail.com',
    });

    expect(response.status).toBe(200);
  });

  it('should login with a valid crendentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'neto.daniribeiro@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
  });

  it('should not login with a invalid crendentials', async () => {
    const response = await request(app).post('/login').send({
      email: 'neto.riberinho@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });
});

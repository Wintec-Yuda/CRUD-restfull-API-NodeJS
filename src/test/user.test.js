import supertest from 'supertest';
import { server, app } from '../app';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

describe('Users API', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    server.close();
  });

  describe('GET /api/users', () => {
    it('should return 200 and get user data', async () => {
      const response = await supertest(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/users', () => {
    afterAll(async () => {
      await prisma.user.deleteMany();
    });
    it('should return 201 and add user data', async () => {
      const data = {
        name: 'test',
        email: 'test@test.com',
        password: 'testtest',
      };
      const response = await supertest(app).post('/api/users').send(data);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Created successfully');
      expect(response.body.data).toHaveProperty('email', 'test@test.com');
    });

    it('should return 400 if data is invalid', async () => {
      const data = {};
      const response = await supertest(app).post('/api/users').send(data);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/users/:id', () => {
    let userId;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          name: 'test',
          email: 'test@test.com',
          password: 'testtest',
        },
      });
      userId = user.id;
    });
    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it('should return 200 and get user by id', async () => {
      const response = await supertest(app).get(`/api/users/${userId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('email', 'test@test.com');
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = uuidv4();
      const response = await supertest(app).get(`/api/users/${nonExistentId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    let userId;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          name: 'test',
          email: 'test@test.com',
          password: 'testtest',
        },
      });
      userId = user.id;
    });
    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it('should return 200 and update user data', async () => {
      const data = {
        name: 'new test',
        email: 'newtest@test.com',
        password: 'newtesttest',
      };
      const response = await supertest(app).put(`/api/users/${userId}`).send(data);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Updated successfully');
      expect(response.body.data).toHaveProperty('email', 'newtest@test.com');
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = uuidv4();
      const data = {
        name: 'new new test',
        email: 'newnewtest@test.com',
        password: 'newnewtesttest',
      };
      const response = await supertest(app).put(`/api/users/${nonExistentId}`).send(data);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    let userId;

    beforeAll(async () => {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          name: 'test',
          email: 'test@test.com',
          password: 'testtest',
        },
      });
      userId = user.id;
    });

    it('should return 200 and delete user by id', async () => {
      const response = await supertest(app).delete(`/api/users/${userId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Deleted successfully');
    });

    it('should return 404 if user not found', async () => {
      const nonExistentId = uuidv4();
      const response = await supertest(app).delete(`/api/users/${nonExistentId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });
});

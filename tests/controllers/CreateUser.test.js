import { describe, it, jest } from '@jest/globals';
import { CreateUserController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';

describe('[Controllers] CreateUser', () => {
  it('should create a new user', async () => {
    const req = HttpRequestMock(
      body={
        name: 'John Doe',
        email: 'john@example.com',
        type: 'user',
        password: '123456'
      }
    )

    const res = await CreateUserController.handle(req);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('email', 'john@example.com');
  });
  
  it('should not create user with existing email', async () => {
    const req = HttpRequestMock(
      body={
        name: 'Jane Doe',
        email: 'admin@spsgroup.com.br',
        type: 'user',
        password: '123456'
      }
    );

    const res = await CreateUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'User with this email already exists');
  });

  it('should not create user with missing parameters', async () => {
    const req = HttpRequestMock()

    const res = await CreateUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Name, email and password are required');
  });

  it('should not allow non-admin users to create a new user', async () => {
    const req = HttpRequestMock(
      body={
        name: 'Regular User',
        email: 'regular@example.com',
        type: 'user',
        password: '123456'
      },
      {},
      {},
      currentUser={
        id: 'regular-user-id',
        name: 'Regular User',
        email: 'regular@example.com',
        type: 'user'
      }
    );

    const res = await CreateUserController.handle(req);
    
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Only admins can create new users');
  });
});

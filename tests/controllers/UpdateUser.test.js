import { describe, it, jest } from '@jest/globals';
import { UpdateUserController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';

describe('[Controllers] UpdateUser', () => {
  it('should update a new user', async () => {
    const req = HttpRequestMock(
      body={
        name: 'John Doe',
      },
      params={
        id: "4453f616-c96d-4d19-af2a-a6bf5258ebd5"
      }
    )

    const res = await UpdateUserController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'John Doe');
  });
  
  it('should throw an error if users not exists', async () => {
    const req = HttpRequestMock(
      body={
        name: 'Jane Doe',
        email: 'admin@spsgroup.com.br',
        type: 'user',
        password: '123456'
      },
      params={
        id: "unique-user-id"
      }
    );

    const res = await UpdateUserController.handle(req);
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  it('should not Update user with missing parameters', async () => {
    const req = HttpRequestMock()

    const res = await UpdateUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'User ID is required');
  });

  it('should not allow non-admin users to Update a new user', async () => {
    const req = HttpRequestMock(
      body={
        name: 'Regular User',
        email: 'regular@example.com',
        type: 'user',
        password: '123456'
      },
      {
        id: "unique-user-id"
      },
      {},
      currentUser={
        id: 'regular-user-id',
        name: 'Regular User',
        email: 'regular@example.com',
        type: 'user'
      }
    );

    const res = await UpdateUserController.handle(req);
    
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Only admins can update new users');
  });
});

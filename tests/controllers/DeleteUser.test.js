import { describe, it, jest } from '@jest/globals';
import { DeleteUserController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';
import { fakeUserRepository } from '../../src/repositories';
import { User } from '../../src/models';

describe('[Controllers] DeleteUser', () => {
  it('should delete a new user', async () => {
    user = new User(
      "User to Delete",
      "user@example.com",
      "user",
      "password123",
    )
    await fakeUserRepository.create(user);

    const req = HttpRequestMock(
      body={},
      params={
        id: user.id
      }
    )

    const res = await DeleteUserController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
  
  it('should throw an error if users not exists', async () => {
    const req = HttpRequestMock(
      body={},
      params={
        id: "unique-user-id"
      }
    );

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  it('should not Delete user with missing parameters', async () => {
    const req = HttpRequestMock()

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'User ID is required');
  });

  it('should not allow non-admin users to delete a new user', async () => {
    const req = HttpRequestMock(
      body={},
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

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Only admins can delete new users');
  });

  it('should not allow admin users to delete their own accounts', async () => {
    const req = HttpRequestMock(
      body={},
      params={
        id: "admin-user-id"
      },
      {},
      currentUser={
        id: 'admin-user-id',
        name: 'Admin User',
        email: 'admin@example.com',
        type: 'admin'
      }
    );

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Admins cannot delete their own accounts');
  });

  it('should not allow deletion of the root admin account', async () => {
    const req = HttpRequestMock(
      body={},
      params={
        id: "4453f616-c96d-4d19-af2a-a6bf5258ebd5"
      },
      {},
      currentUser={
        id: 'some-admin-id',
        name: 'Admin User',
        email: 'admin@example.com',
        type: 'admin'
      }
    );

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Cannot delete the root admin account');
  }); 
});

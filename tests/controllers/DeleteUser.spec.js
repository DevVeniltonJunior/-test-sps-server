import { describe, it, jest } from '@jest/globals';
import { DeleteUserController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';
import { DeleteUser } from '../../src/usecases';
import { NotFoundError } from '../../src/utils';

describe('[Controllers] DeleteUser', () => {
  it('should delete a new user', async () => {
    const req = HttpRequestMock(
      body={},
      params={
        id: "4453f616-c96d-4d19-af2a-a6bf5258ebd5"
      }
    )

    jest.spyOn(DeleteUser.prototype, 'execute').mockResolvedValueOnce(undefined);
    const res = await DeleteUserController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
  
  it('should throw an error if users not exists', async () => {
    const req = HttpRequestMock(
      body={
        name: 'Jane Doe'
      },
      params={
        id: "unique-user-id"
      }
    );

    jest.spyOn(DeleteUser.prototype, 'execute').mockImplementation(() => {
      throw new NotFoundError("User not found");
    });
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

    const res = await DeleteUserController.handle(req);
    
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Only admins can delete new users');
  });
});

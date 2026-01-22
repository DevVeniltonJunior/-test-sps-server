import { it, jest } from '@jest/globals';
import { LoginController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';

describe('[Controllers] Login', () => {
  it('Should login a admin user', async () => {
    req = HttpRequestMock(
      body={
        email: 'admin@spsgroup.com.br',
        password: '1234'
      }
    )

    const res = await LoginController.handle(req)

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Should not login with invalid credentials', async () => {
    req = HttpRequestMock(
      body={
        email: 'admin@spsgroup.com.br',
        password: 'wrongpassword'
      }
    )

    const res = await LoginController.handle(req)

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid credentials'});
  });

  it('Should throw error if user not found', async () => {
    req = HttpRequestMock(
      body={
        email: 'nonexistent@spsgroup.com.br',
        password: '1234'
      }
    )

    const res = await LoginController.handle(req)

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found'});
  });

  it('Should not login with missing fields', async () => {
    req = HttpRequestMock(
      body={
        email: '',
        password: ''
      }
    )

    const res = await LoginController.handle(req)

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Email and password are required'});
  });
});

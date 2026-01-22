import { it, jest } from '@jest/globals';
import { LoginUsecase } from '../../src/usecases';
import { TokenService } from '../../src/services';
import { LoginController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';
import { BadRequestError } from '../../src/utils';

describe('[Controllers] Login', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should login a admin user', async () => {
    jest.spyOn(LoginUsecase.prototype, 'execute').mockResolvedValue({
      name: 'admin',
      email: 'admin@spsgroup.com',
      type: 'admin',
      password: '1234'
    });

    jest.spyOn(TokenService.prototype, 'generateToken').mockReturnValue('valid-token');

    const req = HttpRequestMock(
      body={
        email: 'admin@spsgroup.com',
        password: '1234'
      }
    );

    const res = await LoginController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      token: 'valid-token'
    });
  });

  it('Should not login with missing parameters', async () => {
    const req = HttpRequestMock(
      body={
        password: ''
      }
    );

    const res = await LoginController.handle(req);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'Email and password are required'
    });
  });

  it('Should not login with invalid credentials', async () => {
    jest.spyOn(LoginUsecase.prototype, 'execute').mockImplementation(() => {
      throw new BadRequestError('Invalid credentials');
    });

    const req = HttpRequestMock(
      body={
        email: 'admin@spsgroup.com',
        password: 'wrongpassword'
      }
    );

    const res = await LoginController.handle(req);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'Invalid credentials'
    }); 
  });

  it('Should not login with invalid email format', async () => {
    const req = HttpRequestMock(
      body={
        email: 'invalid-email-format',
        password: '1234'
      }
    );

    const res = await LoginController.handle(req);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'The email provided is invalid'
    });
  });
})

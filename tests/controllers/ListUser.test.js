import { describe, it, jest } from '@jest/globals';
import { ListUserController } from '../../src/controllers';
import { HttpRequestMock } from '../utils';

describe('[Controllers] ListUser', () => {
  it('should list all users', async () => {
    const req = HttpRequestMock(
      body={},
      params={}
    )

    const res = await ListUserController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pagination');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  it('should list all users with filters', async () => {
    const req = HttpRequestMock(
      body={},
      params={
        name: 'John',
      }
    )

    const res = await ListUserController.handle(req);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pagination');
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});

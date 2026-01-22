import { it, jest } from '@jest/globals';
import { User } from '../../src/models';

describe('[Models] User', () => {
  it('should create a user instance correctly', () => {
    const user = new User('John Doe', 'john.doe@example.com', 'user', '123456');

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.password).toBe('123456');
    expect(user.type).toBe('user');
  });

  it('should convert user instance to JSON correctly', () => {
    const user = new User('Jane Doe', 'jane.doe@example.com', 'user', '123456'); 
    const userJson = user.toJSON();
    
    expect(userJson).toHaveProperty('id');
    expect(userJson.name).toBe('Jane Doe');
    expect(userJson.email).toBe('jane.doe@example.com');
    expect(userJson.password).toBe('123456');
    expect(userJson.type).toBe('user');
  });
});
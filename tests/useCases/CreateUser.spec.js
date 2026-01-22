import { describe, expect, it, jest } from '@jest/globals';
import { CreateUser } from "../../src/usecases";
import { User } from "../../src/models";
import { UserRepository } from '../../src/repositories';

describe("[Usecase] CreateUser", () => {
  it("should create and return a new user", async () => {
    const usecase = new CreateUser();
    const user = new User("John Doe", "john@example.com", "user", "123456")
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(UserRepository.prototype, 'create').mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'test@example.com',
      type: 'user',
      password: '123456'
    });
    const newUser = await usecase.execute(user);
    
    expect(newUser).toBeDefined();
    expect(newUser).toHaveProperty("id");
    expect(newUser).toHaveProperty("email");
    expect(newUser).toHaveProperty("name");
  });

  it("should throw an error when user with email already exists", async () => {
    const usecase = new CreateUser();
    const user = new User("John Doe", "john@example.com", "user", "123456")
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue({
      name: 'John Doe',
      email: 'test@example.com',
      type: 'user',
      password: '123456'
    });

    await expect(usecase.execute(user)).rejects.toThrow("User with this email already exists");
  });
});
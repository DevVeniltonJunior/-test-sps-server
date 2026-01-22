import { it, jest } from '@jest/globals';
import { LoginUsecase } from "../../src/usecases";
import { UserRepository } from '../../src/repositories';

describe("[Usecase] LoginUsecase", () => {
  it("should return a user object when provided valid credentials", async () => {
    const usecase = new LoginUsecase();
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue({
      name: 'admin',
      email: 'test@example.com',
      role: 'admin',
      password: '123456'
    });

    const user = await usecase.execute("test@example.com", "123456");

    expect(user).toHaveProperty("email", "test@example.com");
  });

  it("should throw an error when provided invalid credentials", async () => {
    const usecase = new LoginUsecase();
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue({
      name: 'admin',
      email: 'test@example.com',
      role: 'admin',
      password: '123456'
    });

    await expect(usecase.execute("test@example.com", "wrongpassword")).rejects.toThrow();
  });

  it("should throw an error when user not found", async () => {
    const usecase = new LoginUsecase();
    jest.spyOn(UserRepository.prototype, 'findByEmail').mockResolvedValue(null);

    await expect(usecase.execute("nonexistent@spsgroup.com.br", "1234")).rejects.toThrow();
  });
});
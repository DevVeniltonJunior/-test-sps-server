import { it, jest } from '@jest/globals';
import { LoginUsecase } from "../../src/usecases";
import { UserRepository } from '../../src/repositories';

describe("[Usecase] LoginUsecase", () => {
  it("should return a user object when provided valid credentials", async () => {
    const usecase = new LoginUsecase();
    const user = await usecase.execute("admin@spsgroup.com.br", "1234");

    expect(user).toHaveProperty("email", "admin@spsgroup.com.br");
  });

  it("should throw an error when provided invalid credentials", async () => {
    const usecase = new LoginUsecase();

    await expect(usecase.execute("admin@spsgroup.com.br", "wrongpassword")).rejects.toThrow();
  });

  it("should throw an error when user not found", async () => {
    const usecase = new LoginUsecase();

    await expect(usecase.execute("nonexistent@spsgroup.com.br", "1234")).rejects.toThrow();
  });
});
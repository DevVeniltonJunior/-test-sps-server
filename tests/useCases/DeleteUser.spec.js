import { describe, expect, it, jest } from '@jest/globals';
import { DeleteUser } from "../../src/usecases";
import { NotFoundError } from '../../src/utils';
import { UserRepository } from '../../src/repositories';

describe("[Usecase] DeleteUser", () => {
  it("should delete and return a user", async () => {
    const usecase = new DeleteUser();

    jest.spyOn(UserRepository.prototype, 'delete').mockResolvedValue({
      id: '4453f616-c96d-4d19-af2a-a6bf5258ebd5',
      name: 'Jane Doe',
      email: 'test@example.com',
      type: 'user',
      password: '123456'
    });
    const DeletedUser = await usecase.execute("4453f616-c96d-4d19-af2a-a6bf5258ebd5", { name: "Jane Doe" });

    expect(DeletedUser).toBeUndefined();
  });

  it("should throw an error if user not exists", async () => {
    const usecase = new DeleteUser();

    jest.spyOn(UserRepository.prototype, 'delete').mockImplementation(() => {
      throw new NotFoundError("User not found");
    });

    await expect(usecase.execute("unexistent", { name: "Jane Doe" })).rejects.toThrow("User not found");
  });
});
import { describe, expect, it, jest } from '@jest/globals';
import { DeleteUser } from "../../src/usecases";

describe("[Usecase] DeleteUser", () => {
  it("should Delete and return a user", async () => {
    const usecase = new DeleteUser();

    expect(await usecase.execute("4453f616-c96d-4d19-af2a-a6bf5258ebd5")).toBeUndefined();
  });

  it("should throw an error if user not exists", async () => {
    const usecase = new DeleteUser();

    await expect(usecase.execute("unexistent")).rejects.toThrow("User not found");
  });
});
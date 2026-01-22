import { describe, expect, it, jest } from '@jest/globals';
import { UpdateUser } from "../../src/usecases";

describe("[Usecase] UpdateUser", () => {
  it("should Update and return a user", async () => {
    const usecase = new UpdateUser();

    const updatedUser = await usecase.execute("4453f616-c96d-4d19-af2a-a6bf5258ebd5", { name: "Jane Doe" });

    expect(updatedUser).toBeDefined();
    expect(updatedUser).toHaveProperty("id");
    expect(updatedUser).toHaveProperty("email");
    expect(updatedUser).toHaveProperty("name");
  });

  it("should throw an error if user not exists", async () => {
    const usecase = new UpdateUser();

    await expect(usecase.execute("unexistent", { name: "Jane Doe" })).rejects.toThrow("User not found");
  });
});
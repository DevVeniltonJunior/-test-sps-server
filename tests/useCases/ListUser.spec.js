import { describe, expect, it, jest } from '@jest/globals';
import { ListUser } from "../../src/usecases";

describe("[Usecase] ListUser", () => {
  it("should list all users", async () => {
    const usecase = new ListUser();

    expect(await usecase.execute()).toHaveProperty('data');
    expect((await usecase.execute()).data.length).toBeGreaterThan(0);
    expect(await usecase.execute()).toHaveProperty('pagination');
  });

  it("should list users with filters", async () => {
    const usecase = new ListUser();
    const filters = { name: "John" };
    const users = await usecase.execute(filters);
    
    expect(users).toBeDefined();
    expect(users).toHaveProperty('pagination');
    expect(users.data.length).toBe(0);
  });
});
import { expect, it, jest } from '@jest/globals';
import { UserRepository } from "../../src/repositories";
import { User } from "../../src/models";

describe("[Repositories] UserRepository", () => {
  const userData = new User("John Doe", "john@example.com", "user", "password123");

  it("should create a user", async () => {
    const repository = new UserRepository();
    const user = await repository.create(userData);

    expect(user).toBeDefined();
  }); 

  it("should find a user by email", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const user = await repository.findByEmail(userData.email);

    expect(user).toBeDefined();
  });

  it("should find a user by id", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const user = await repository.findById(userData.id);

    expect(user).toBeDefined();
  });

  it("should list all users", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const users = await repository.list();
    
    expect(users).toBeDefined();
    expect(users.pagination).toBeDefined();
    expect(users.data.length).toBeGreaterThan(1);
  });

  it("should list users with filters", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const filters = { name: "John" };
    const users = await repository.list(filters);
    
    expect(users).toBeDefined();
    expect(users.data.length).toBeGreaterThan(0);
  });

  it("should update successfully", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const updatedName = "Jane Doe";
    const user = await repository.update(userData.id, { name: updatedName });

    expect(user.name).toBe(updatedName);
  });

  it("should throw error when updating non-existent user", async () => {
    const repository = new UserRepository();
    
    await expect(repository.update("nonexistent", { name: "Test" })).rejects.toThrow("User not found");
  });
  
  it("should delete successfully", async () => {
    const repository = new UserRepository();
    await repository.create(userData);
    const deleted = await repository.delete(userData.id);

    expect(deleted).toBe(true);
  });

  it("should throw error when deleting non-existent user", async () => {
    const repository = new UserRepository();
    
    await expect(repository.delete("nonexistent")).rejects.toThrow("User not found");
  });
});

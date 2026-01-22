import { fakeUserRepository } from '../repositories/index.js';

export class UpdateUser {
  repository = fakeUserRepository;

  async execute(userId, userDTO) {
    try {
      return await this.repository.update(userId, userDTO);
    } catch (error) {
      throw error;
    }
  }
}
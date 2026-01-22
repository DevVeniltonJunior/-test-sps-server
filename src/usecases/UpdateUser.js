import { UserRepository } from '../repositories/index.js';

export class UpdateUser {
  repository = new UserRepository();

  async execute(userId, userDTO) {
    try {
      return await this.repository.update(userId, userDTO);
    } catch (error) {
      throw error;
    }
  }
}
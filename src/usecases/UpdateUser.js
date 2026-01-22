import { UserRepository } from '../repositories';

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
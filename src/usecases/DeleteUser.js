import { UserRepository } from '../repositories';

export class DeleteUser {
  repository = new UserRepository();

  async execute(userId) {
    try {
      const isDeleted = await this.repository.delete(userId);
      if (!isDeleted) {
        throw new Error('User could not be deleted');
      }
      
      return;
    } catch (error) {
      throw error;
    }
  }
}
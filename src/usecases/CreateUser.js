import { UserRepository } from '../repositories/index.js';
import { BadRequestError } from '../utils/index.js';

export class CreateUser {
  repository = new UserRepository();

  async execute(user) {
    try {
      const existingUser = await this.repository.findByEmail(user.email);
      if (existingUser) {
        throw new BadRequestError('User with this email already exists');
      }
  
      return await this.repository.create(user);
    } catch (error) {
      throw error;
    }
  }
}
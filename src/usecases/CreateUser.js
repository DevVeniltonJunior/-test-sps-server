import { fakeUserRepository } from '../repositories/index.js';
import { BadRequestError } from '../utils/index.js';

export class CreateUser {
  repository = fakeUserRepository;
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
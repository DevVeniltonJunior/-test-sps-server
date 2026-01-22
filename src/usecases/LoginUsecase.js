import { UserRepository } from '../repositories';
import { BadRequestError } from '../utils';

export class LoginUsecase {
  repository = new UserRepository();

  async execute(email, password) {
    try {
      const user = await this.repository.findByEmail(email);
      if (!user || user.password !== password) throw new BadRequestError('Invalid credentials');
  
      return user;
    }
    catch (error) {
      throw error;
    }
  }
}
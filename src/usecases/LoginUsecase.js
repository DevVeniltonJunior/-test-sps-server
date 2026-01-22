import { UserRepository } from '../repositories';
import { BadRequestError, NotFoundError } from '../utils';

export class LoginUsecase {
  repository = new UserRepository();

  async execute(email, password) {
    try {
      const user = await this.repository.findByEmail(email);
      if (!user) throw new NotFoundError('User not found');
      if (user.password !== password) throw new BadRequestError('Invalid credentials');
  
      return user;
    }
    catch (error) {
      throw error;
    }
  }
}
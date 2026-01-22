import { BadRequestError, EmailValidator } from '../utils';
import { LoginUsecase } from '../usecases';
import { TokenService } from '../services';

export class LoginController {
  static async handle(req) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw new BadRequestError('Email and password are required');
      if (!EmailValidator.validate(email)) throw new BadRequestError('The email provided is invalid');
      
      const authenticatedUser = await new LoginUsecase().execute(email, password);
  
      const token = await new TokenService().generateToken(authenticatedUser);
  
      return {
        statusCode: 200,
        body: { token },
      };
    }
    catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message || 'Internal Server Error' },
      };
    }
  }
}
import { CreateUser } from "../usecases";
import { BadRequestError, NotAllowedError } from "../utils";
import { User } from "../models";

export class CreateUserController {
  static async handle(req) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser || currentUser.type !== 'admin') {
        throw new NotAllowedError('Only admins can create new users');
      }

      const { name, email, type, password } = req.body;
      if (!name || !email || !password) {
        throw new BadRequestError('Name, email and password are required');
      }

      if (!type) type = 'user';

      const newUser = await new CreateUser().execute(new User(name, email, type, password));

      return {
        statusCode: 201,
        body: newUser,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message || 'Internal Server Error' },
      };
    }
  }
}
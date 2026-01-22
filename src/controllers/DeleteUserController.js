import { DeleteUser } from "../usecases/index.js";
import { BadRequestError, NotAllowedError } from "../utils/index.js";
import { User } from "../models/index.js";

export class DeleteUserController {
  static async handle(req) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser || currentUser.type !== 'admin') {
        throw new NotAllowedError('Only admins can delete new users');
      }

      const userId = req.params.id;
      if (!userId ) {
        throw new BadRequestError('User ID is required');
      }

      await new DeleteUser().execute(userId);

      return {
        statusCode: 200,
        body: { message: "User deleted successfully" },
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message || 'Internal Server Error' },
      };
    }
  }
}
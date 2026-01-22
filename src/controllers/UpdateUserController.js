import { UpdateUser } from "../usecases/index.js";
import { BadRequestError, NotAllowedError } from "../utils/index.js";
import { User } from "../models/index.js";

export class UpdateUserController {
  static async handle(req) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser || currentUser.type !== 'admin') {
        throw new NotAllowedError('Only admins can update new users');
      }

      const { name, email, type, password } = req.body;
      const userId = req.params.id;
      if (!userId ) {
        throw new BadRequestError('User ID is required');
      }

      const userDTO = {};
      if (name) userDTO.name = name;
      if (email) userDTO.email = email;
      if (type) userDTO.type = type;
      if (password) userDTO.password = password;
      
      const updatedUser = await new UpdateUser().execute(userId, userDTO);

      return {
        statusCode: 200,
        body: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message || 'Internal Server Error' },
      };
    }
  }
}
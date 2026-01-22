import { ListUser } from "../usecases";

export class ListUserController {
  static async handle(req) {
    try {
      const { name, email, type, orderBy, limit, page } = req.query;

      const filter = {};
      if (name) filter.name = name;
      if (email) filter.email = email;
      if (type) filter.type = type;

      const users = await new ListUser().execute(filter, orderBy, limit, page);

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: { error: error.message || 'Internal Server Error' },
      };
    }
  }
}
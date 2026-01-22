import { UserRepository, DEFAULT_LIMIT, DEFAULT_ORDER_BY, DEFAULT_FILTERS, DEFAULT_PAGE } from '../repositories/index.js';

export class ListUser {
  repository = new UserRepository();

  async execute(filters=DEFAULT_FILTERS, orderBy=DEFAULT_ORDER_BY, limit=DEFAULT_LIMIT, page=DEFAULT_PAGE) {
    try {
      return await this.repository.list(filters, orderBy, limit, page);
    } 
    catch (error) {
      throw error;
    }
  }
}
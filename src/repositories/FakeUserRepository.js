import { NotFoundError } from '../utils/index.js';

export const DEFAULT_LIMIT = 10;
export const DEFAULT_ORDER_BY = 'createdAt:desc';
export const DEFAULT_FILTERS = {};
export const DEFAULT_PAGE = 1;

export class UserRepository {
  constructor() {
    this.users = [];

    this.users.push({
      id: "4453f616-c96d-4d19-af2a-a6bf5258ebd5",
      name: 'admin',
      email: 'admin@spsgroup.com.br',
      type: 'admin',
      password: '1234',
      createdAt: new Date().toISOString(),
    });
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email) || null;
  }

  async findById(id) {
    return this.users.find(user => user.id === id) || null;
  }

  async list(filters = DEFAULT_FILTERS, orderBy = DEFAULT_ORDER_BY, limit = DEFAULT_LIMIT, page = DEFAULT_PAGE) {
    let filteredUsers = this.users;

    if (filters.name) {
      filteredUsers = filteredUsers.filter(user => user.name.includes(filters.name));
    }

    if (filters.email) {
      filteredUsers = filteredUsers.filter(user => user.email.includes(filters.email));
    }

    if (filters.type) {
      filteredUsers = filteredUsers.filter(user => user.type === filters.type);
    }

    if (orderBy) {
      const [key, order] = orderBy.split(':');
      filteredUsers = filteredUsers.sort((a, b) => {
        if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
        if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
        return 0;
      });
    }

    const pagination = {
      totalRows: filteredUsers.length,
      totalPages: limit ? Math.ceil(filteredUsers.length / limit) : 1,
      currentPage: page || 1,
      rowsPerPage: limit || filteredUsers.length
    }

    const limitedData = limit ? filteredUsers.slice((pagination.currentPage - 1) * limit, pagination.currentPage * limit) : filteredUsers;

    return {
      data: limitedData,
      pagination: pagination
    }
  }

  async create(user) {
    const userData = { ...user.toJSON(), createdAt: new Date().toISOString() };
    this.users.push(userData);
    return userData;
  }

  async update(id, updatedFields) {
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) throw new NotFoundError('User not found');
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updatedFields
    };
    return this.users[userIndex];
  }

  async delete(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) throw new NotFoundError('User not found');
    this.users.splice(userIndex, 1);
    return true;
  }
}
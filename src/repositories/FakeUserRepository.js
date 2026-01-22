import { User } from '../models';
import { NotFoundError } from '../utils';

export class UserRepository {
  constructor() {
    this.users = [];

    this.users.push(
      new User('admin', 'admin@spsgroup.com.br', 'admin', '1234').toJSON()
    );
  }

  async findByEmail(email) {
    const user = this.users.find(user => user.email === email) || null;
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async findById(id) {
    const user = this.users.find(user => user.id === id) || null;
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async list() {
    return this.users;
  }

  async create(user) {
    this.users.push(user.toJSON());
    return user.toJSON();
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
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
}
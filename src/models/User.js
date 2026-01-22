import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(name, email, role, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password
    };
  }
}
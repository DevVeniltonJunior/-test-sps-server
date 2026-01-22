import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(name, email, type, password) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.type = type;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: this.type,
      password: this.password
    };
  }
}
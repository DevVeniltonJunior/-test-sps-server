import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import { UnauthorizedError } from "../utils/index.js";

const DEFAULT_TOKEN_EXPIRY_HOURS = 24;

export class TokenService {
  constructor(config={}) {
    this.jwtSecret = config.jwtSecret || this.#generateDefaultSecret();
    this.tokenExpiry = config.tokenExpiry || DEFAULT_TOKEN_EXPIRY_HOURS;
  }

  #generateDefaultSecret() {
    return process.env.JWT_SECRET ?? randomBytes(32).toString("hex")
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type
    }
    
    return jwt.sign(
      payload,
      this.jwtSecret,
      { expiresIn: `${this.tokenExpiry}h` }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token expired');
      }

      throw new UnauthorizedError('Invalid token');
    }
  }
}

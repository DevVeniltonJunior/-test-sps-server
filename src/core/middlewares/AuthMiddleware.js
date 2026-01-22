import { TokenService } from '../../services';
import { UnauthorizedError } from '../../utils';

const tokenService = new TokenService({
  jwtSecret: process.env.JWT_SECRET || undefined,
  tokenExpiry: process.env.TOKEN_EXPIRY_HOURS || undefined
});

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Authorization header missing');
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid authorization format');
  }

  const decoded = tokenService.verifyToken(token);

  req.user = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role
  };

  next();
}

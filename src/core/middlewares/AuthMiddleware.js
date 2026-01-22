import { TokenService } from '../../services/index.js';
import { UnauthorizedError } from '../../utils/index.js';


export function authMiddleware(req, res, next) {
  try {
    const tokenService = new TokenService();
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
      type: decoded.type
    };
  
    next();
  }
  catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message || 'Unauthorized' });
  }
}

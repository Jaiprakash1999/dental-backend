import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    const { headers } = req;

    // Token validation
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    try {
      const payload = this.jwtService.verify(token);
      req.headers.role = payload.userType; // Add role to headers
      req.headers.username = payload.username; // Add username to headers
      req.headers.id = payload.id;
      req.headers.headId = payload.headId;
      req.headers.name = payload.name;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token', error);
    }

    next(); // Proceed to the next middleware or route handler
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { role } = request.headers; // Assume role comes in the headers as 'userrole'
    // Retrieve the allowed roles from the route metadata
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!allowedRoles) {
      // If no roles are set on the route, allow access
      return true;
    }

    if (!role) {
      throw new UnauthorizedException('Role is missing in request headers');
    }

    // Check if the user's role is in the allowed roles
    const hasRole = allowedRoles.includes(role);

    if (!hasRole) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}

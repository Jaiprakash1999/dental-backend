import { SetMetadata } from '@nestjs/common';

// Custom decorator to attach required roles to a route
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole, ROLES_KEY } from 'src/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextType = context.getType();

    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    let user = null;

    if (contextType === 'http') {
      user = context.switchToHttp().getRequest().user;
    } else if (contextType === 'ws') {
      user = context.switchToWs().getClient().handshake.user;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}

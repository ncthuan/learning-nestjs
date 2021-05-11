import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/entities/user.entity';

export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    let roles = null;
    try {
      roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    } catch (error) {
      if (!roles || roles.length == 0) {
        return true;
      }
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return roles.includes(user.role);
  }
}

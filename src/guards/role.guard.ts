import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(roles);

    if (!roles || roles.length == 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return roles.includes(user.role);
  }
}

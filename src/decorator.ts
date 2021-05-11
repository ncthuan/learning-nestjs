import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserRole } from './user/entities/user.entity';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

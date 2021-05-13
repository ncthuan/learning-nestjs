import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRole } from '../database/entities/user.entity';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

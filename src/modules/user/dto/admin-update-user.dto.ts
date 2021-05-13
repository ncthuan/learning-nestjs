//import { IsNotEmpty } from 'class-validator';
import { IsEmail, IsOptional } from 'class-validator';
import { UserRole } from '../../../database/entities/user.entity';

export class AdminUpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly password: string;
}

export class SuperAdminUpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsOptional()
  readonly password: string;

  @IsOptional()
  readonly role?: UserRole;
}

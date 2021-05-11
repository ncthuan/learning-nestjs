//import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class AdminUpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly role?: UserRole;
}

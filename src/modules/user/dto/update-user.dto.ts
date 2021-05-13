import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly password: string;
  
  readonly newEmail?: string;

  readonly newPassword?: string;
}

import { PartialType, OmitType } from '@nestjs/mapped-types';
import { UpdateProfileDto } from '.';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['username'] as const)
) {
  readonly profile: UpdateProfileDto;
}

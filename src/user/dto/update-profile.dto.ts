import { PartialType, OmitType } from '@nestjs/mapped-types';
import { Profile } from '../entities';

export class UpdateProfileDto extends PartialType(
  OmitType(Profile, ['id'] as const)
) {}

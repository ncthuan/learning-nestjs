import { IsNotEmpty } from 'class-validator';

export class PagingDto {
  @IsNotEmpty()
  offset: number;

  @IsNotEmpty()
  limit: number;
}

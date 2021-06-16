import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number = 100000;

  @IsOptional()
  readonly offset: number = 0;
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({description: 'The first name of the user', example: 'Ada'})
  @IsString()
  readonly firstName: string;

  @ApiProperty({description: 'The last name of the user', example: 'Lovelace'})
  @IsString()
  readonly lastName: string;

  @ApiProperty({description: 'The email of the user', example: 'lovelace@gmail.com'})
  @IsString()
  readonly email: string;
}

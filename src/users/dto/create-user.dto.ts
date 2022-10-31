import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
    name: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
    email: string;

  @IsString()
  @ApiProperty()
    password: string;

  @ApiProperty()
    isEnabled: false;

  @ApiProperty()
    accessToken: string;

  @ApiProperty()
    refreshToken: string;
}

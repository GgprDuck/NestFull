import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Name of the user' })
    name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Password of the user' })
    password: string;
}

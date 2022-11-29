import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Name of the user' })
    name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Email of the user' })
    email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Password of the user' })
    password: string;
}

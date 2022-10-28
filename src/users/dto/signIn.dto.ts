import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

}
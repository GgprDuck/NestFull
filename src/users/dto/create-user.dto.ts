import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, isString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty()
  isEnabled?: Boolean;
}

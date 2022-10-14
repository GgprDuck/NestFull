import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';

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

  @ApiProperty()
  accessTocken?: string;

  @ApiProperty()
  refreshTocken?: string;
}

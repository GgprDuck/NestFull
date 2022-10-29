import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @ApiProperty()
      name:string;

    @IsString()
    @ApiProperty()
      email:string;

    @IsString()
    @ApiProperty()
      password:string;

    @IsString()
    @ApiProperty()
      style: String;

    @IsString()
    @ApiProperty()
      rate: Number;

    @IsString()
    @ApiProperty()
      author: String;

    @ApiProperty({ type: [String] })
      comments?: string[];
}

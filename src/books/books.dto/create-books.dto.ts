import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsString, MaxLength, MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Name of the Book' })
    name: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Email of user that posted this book' })
    email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Password of user which posted this book' })
    password: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Style of the book' })
    style: String;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Rate of the book' })
    rate: Number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(128)
  @IsString()
  @ApiProperty({ type: String, description: 'Name of the author' })
    author: String;

  @ApiProperty({ type: [String] })
    comments?: string[];
}

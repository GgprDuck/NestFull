import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BookDto {
    @IsString()
    @ApiProperty({ type: String, description: 'Name of the Book' })
      name:string;

    @IsString()
    @ApiProperty({ type: String, description: 'Email of user that posted this book' })
      email:string;

    @IsString()
    @ApiProperty({ type: String, description: 'Password of user which posted this book' })
      password:string;

    @IsString()
    @ApiProperty({ type: String, description: 'Style of the book' })
      style: String;

    @IsString()
    @ApiProperty({ type: Number, description: 'Rate of the book' })
      rate: Number;

    @IsString()
    @ApiProperty({ type: String, description: 'Name of the author' })
      author: String;

    @ApiProperty({ type: [String] })
      comments?: string[];
}

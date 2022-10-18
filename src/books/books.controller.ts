import { Body,  ConflictException,  ValidationPipe } from '@nestjs/common';
import { Controller, Post, } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';


@Controller('/v1/book')
export class BooksController {
  constructor(private BooksService: BooksService) { }

  
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(Book),
        },
      },
    },
    description: '200. Success. Returns a book',
  })
  @ApiBadRequestResponse({
    description: '400. BadRequestException.',
  })
  @Post('/create')
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    const book = this.BooksService.create(createBookDto);
    if(book){
      return book;
    }
    return new ConflictException('Enter all necessary values');
  }
}
import { Body } from '@nestjs/common';
import { Controller, Post, } from '@nestjs/common/decorators';
import { ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';

@Controller('/v1/book')
export class BooksController {
  constructor(private BooksService: BooksService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'The book has been successfully created.',})
  @ApiResponse({ status: 500, description: 'Forbidden.'})
  getUser(@Body('name') name:string, @Body('style') style:string, @Body('rate') rate:number, @Body('author') author:string): Promise<Book> {
    return this.BooksService.create({
      name: name,
      style:style,
      rate: rate,
      author: author,
       });
  }

}
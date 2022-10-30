import {
  BadRequestException, Body, Get, NotFoundException, UseGuards,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { get } from 'http';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import LocalAuthGuard from '../guards/local.auth.guards';

@Controller()
export class BooksController {
  constructor(private bookService: BooksService) { }

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
    @Post('/createBook')
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.bookService.create(createBookDto);

    if (!book) {
      throw new BadRequestException('Enter all necessary values');
    }

    return book;
  }

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
  @Get('/findAllBooks')
  async findAllBooks() {
    const books = this.bookService.findAllBooks();

    if (!books) {
      throw new NotFoundException('Cannot find books');
    }

    return books;
  }
}

import {
  BadRequestException, Body, Get, NotFoundException, UseGuards,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import { BookDto } from './books.dto/book.dto';
import JwtAuthGuard from '../guards/local.auth.guards';

@ApiTags('Books')
@ApiExtraModels(BookDto)
@Controller()
export class BooksController {
  constructor(private bookService: BooksService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(BookDto),
        },
      },
    },
    description: '200. Success. Returns a book',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(BookDto),
        },
      },
    },
    description: '200. Success. Returns a book',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
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

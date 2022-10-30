import {
  BadRequestException, Body, UseGuards,
} from '@nestjs/common';
import { Controller, Post } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import LocalAuthGuard from '../guards/local.auth.guards';

@Controller()
export class BooksController {
  BooksService: BooksService;

  @UseGuards(LocalAuthGuard)
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
    const book = await this.BooksService.create(createBookDto);

    if (!book) {
      throw new BadRequestException('Enter all necessary values');
    }

    return book;
  }
}

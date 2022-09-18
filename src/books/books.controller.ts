import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Post, } from '@nestjs/common/decorators';
import { ApiResponse } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';


@Controller('/v1/book')
export class BooksController {
  constructor(private BooksService: BooksService) { }

  @Post('/create')
  @ApiResponse({ status: 201, description: 'The book has been successfully created.', })
  @ApiResponse({ status: 500, description: 'Forbidden.' })
  getUser(@Body(new ValidationPipe()) createBookDto: CreateBookDto,
  )  
      {
      this.BooksService.create(createBookDto);
    }
    // return this.BooksService.create({
    //   name: name,
    //   style: style,
    //   rate: rate,
    //   author: author,
    // });
  }
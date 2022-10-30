import { Injectable } from '@nestjs/common';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.create(createBookDto);
  }

  async findAllBooks() {
    return this.booksRepository.findAllBooks();
  }
}

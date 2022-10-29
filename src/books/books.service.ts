import { Injectable } from '@nestjs/common';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private BooksRepository: BooksRepository) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.BooksRepository.create(createBookDto);
  }

  async findAllBooks() {
    return this.BooksRepository.findAllBooks();
  }
}

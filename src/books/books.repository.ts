import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './books.dto/create-books.dto';
import { Book, BookDocument } from './schemas/books.schema';

@Injectable()
export class BooksRepository {
  @InjectModel(Book.name) private BookModel: Model<BookDocument>;

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdUser = new this.BookModel(createBookDto);
    await createdUser.save();
    return createdUser;
  }

  async findAllBooks() {
    return this.BookModel.find().exec();
  }
}

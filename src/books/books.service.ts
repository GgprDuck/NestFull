import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/books.schema';
import { CreateBookDto } from './books.dto/create-books.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdUser = new this.bookModel(createBookDto);
    return createdUser.save();
  }

  async findAllBooks(){
    return this.bookModel.find().exec();
  }


}
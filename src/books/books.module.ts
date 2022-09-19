import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/books.schema';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, UsersRepository],
})
export class BooksModule {}
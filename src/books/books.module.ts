import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/books.schema';
import { BooksRepository } from './books.repository';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema }, { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}

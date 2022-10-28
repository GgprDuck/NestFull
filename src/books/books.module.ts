import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/books.schema';
import { BooksRepository } from './books.repository';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { User, UserSchema } from '../users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, UsersRepository, JwtService,AuthService],
})
export class BooksModule {}
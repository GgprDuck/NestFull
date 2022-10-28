import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './schemas/books.schema';
import { BooksRepository } from './books.repository';
import { AuthModule} from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name:User.name, schema: UserSchema }]),
    UsersModule,
    AuthModule
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, UsersRepository, JwtService, AuthService],
})
export class BooksModule {}
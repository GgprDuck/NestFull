import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/books', module: BooksModule},
    ],
  },
];

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/usersBooks'), 
  RouterModule.register(routes),
  UsersModule,
  BooksModule,
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

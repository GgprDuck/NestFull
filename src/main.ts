import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { BooksModule } from './books/books.module';
import { HttpExceptionFilter } from './exeption.filter';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Users/Books')
    .setDescription('The users API description')
    .setVersion('2.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .addTag('users/books')
    .build();

  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule, UsersModule, BooksModule, AuthModule],
  });

  SwaggerModule.setup('api/usersBooks', app, userDocument);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();

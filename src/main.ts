import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BooksModule } from './books/books.module';
import { HttpExceptionFilter } from './exeption.filter';
import { ValidationPipe } from './pipes/valodationPipe'
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  
  const app = await NestFactory.create(AppModule,{
    rawBody: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Users/Books')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users/books')
    .build();

  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule,UsersModule, BooksModule],
  });

  SwaggerModule.setup('api/usersBooks', app, userDocument);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(PORT, () => console.log('Server started on port ' + PORT));
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';
import { BooksModule} from './books/books.module'; 

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  
  const app = await NestFactory.create(AppModule,{
    rawBody: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [UsersModule],
  });

  SwaggerModule.setup('api/users', app, userDocument);

  const secondOptions = new DocumentBuilder()
  .setTitle('Books example')
  .setDescription('The books API description')
  .setVersion('1.0')
  .addTag('books')
  .build();

const bookDocument = SwaggerModule.createDocument(app, secondOptions, {
  include: [BooksModule],
});
SwaggerModule.setup('', app, bookDocument);
  
  await app.listen(PORT, () => console.log('Server started on port ${PORT}'));
}
bootstrap();

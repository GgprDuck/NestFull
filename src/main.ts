import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{
    rawBody: true,
  });

  const config = new DocumentBuilder()
    .setTitle(' Server')
    .setDescription('The users-books API description')
    .setVersion('1.0')
    .addTag('users-books')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000, () => console.log('Server started on port 3000'));
}
bootstrap();

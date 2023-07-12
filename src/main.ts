import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // swagger start
  const options = new DocumentBuilder()
    .setTitle('nest_crud')
    .setDescription('nest_crud is decripition')
    .setVersion('1.0')
    .addTag('nest_crud')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // swagger end

  await app.listen(3000);
}
bootstrap();

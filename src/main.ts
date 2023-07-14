import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: 'prev',
      rolling: true,
      name: 'login.sid',
      cookie: {
        maxAge: null,
      },
    }),
  );

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

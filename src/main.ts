import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as session from 'express-session';

// 全局白名单中间件
// import { Request, Response, NextFunction } from 'express';
// function middleWareAll(req: Request, res: Response, next: NextFunction) {
//   console.log(req.originalUrl);
//   const whiteList = ['/user/config'];
//   if (whiteList.includes(req.originalUrl)) {
//     next();
//   } else {
//     res.send('小黑子露出鸡脚了吧');
//   }
//   next();
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(middleWareAll);
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

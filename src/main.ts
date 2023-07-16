import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResInterceptor } from './commom/resInterceptor';
import { HttpFilter } from './commom/httpFilter';
import { ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './manager/role/role.guard';

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), { prefix: '/images' });
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

  app.useGlobalInterceptors(new ResInterceptor());
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());

  await app.listen(3000);
}
bootstrap();

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  // use(req: TRequest, res: TResponse, next: (error?: Error | any) => void): any;
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('I‘m coming, heiheihei');
    // res.send('我被拦截了');
    next();
  }
}

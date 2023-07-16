import { CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResInterceptor implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          message: '牛逼',
          success: true,
        };
      }),
    );
  }
}

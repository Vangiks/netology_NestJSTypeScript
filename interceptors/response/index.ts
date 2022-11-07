import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => ({
        status: true,
        response: value,
        errors: [],
      })),
      catchError((err) => {
        return throwError(() => ({
          status: true,
          response: null,
          errors: [err],
        }));
      }),
    );
  }
}

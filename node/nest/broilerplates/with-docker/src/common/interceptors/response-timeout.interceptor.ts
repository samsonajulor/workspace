import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

/**
 * Interceptor to set response timeout, defaults to 5000ms
 */
@Injectable()
export class ResponseTimeoutInterceptor implements NestInterceptor {
  constructor(private readonly customTimeout?: number) {}
  private readonly defaultTimeoutMs = 5000

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.customTimeout || this.defaultTimeoutMs),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException())
        }
        return throwError(err)
      }),
    )
  }
}

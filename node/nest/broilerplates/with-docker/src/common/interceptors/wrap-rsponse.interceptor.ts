import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { classToPlain } from 'class-transformer'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Interceptor which wraps response, adds status code and timestamp
 */
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>()
    return next.handle().pipe(
      map((data) => ({
        status: response.statusCode,
        timestamp: Date.now(),
        length: data ? data.length : 0,
        data: classToPlain(data),
      })),
    )
  }
}

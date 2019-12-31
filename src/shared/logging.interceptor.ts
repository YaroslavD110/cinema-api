import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${req.method} 200 [${ip}]: ${req.url} | +${Date.now() - now}ms`
        );
      })
    );
  }
}

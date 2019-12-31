import {
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Request');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = `${req.method} ${status} [${ip}]: ${req.url}`;
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(errorMessage, exception.stack);
    } else {
      this.logger.error(errorMessage);
    }

    super.catch(exception, host);
  }
}

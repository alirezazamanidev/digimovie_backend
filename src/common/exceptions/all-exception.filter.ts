import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { deleteFilesInPublic } from '../utils';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    let message: string;
    let status: number;
    const ctx = host.switchToHttp();
    const req=ctx.getRequest();
    
    deleteFilesInPublic(req)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = new InternalServerErrorException().message;
    }
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      errors: {
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        message,
      },
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ValidationException } from './validation.exception';
import { Response } from 'express';
import { deleteFilesInPublic } from '../utils';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const req=ctx.getRequest();
    // delete images if validation error
    
    deleteFilesInPublic(req);
    let errors = [];
    let statusCode: number,
      message = 'validation Error!';
    if (exception instanceof HttpException) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      errors = exception.errors;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = new InternalServerErrorException().message;
    }
    const responseBody ={
        statusCode,
        message,
        errors
    }
    return res.status(responseBody.statusCode).json(responseBody);
}
}
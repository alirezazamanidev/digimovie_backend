import { ExceptionFilter } from '@nestjs/common';
import { AllExceptionFilter } from './all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationFilter } from './validation.filter';
export * from './all-exception.filter'
export const getGlobalFilters = (
    httpAdapter: HttpAdapterHost,
  ): ExceptionFilter<any>[] => [
    new AllExceptionFilter(httpAdapter),
    new ValidationFilter(),
  ];
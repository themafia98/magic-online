import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { IMongoErrorResponse } from '../../interfaces/Filters.interface';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.code;

    const message: IMongoErrorResponse = {
      statusCode: status,
      path: request.url,
      errorType: exception.name,
      errorMessage: exception.message,
    };

    response.status(status).json(message);
  }
}

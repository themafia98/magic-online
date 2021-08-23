import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type, message) => {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      });
    };

    const { error: errorString } =
      (exception.message as unknown as Record<string, string>) || {};

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (errorString) {
      responseMessage('Error', errorString);
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}

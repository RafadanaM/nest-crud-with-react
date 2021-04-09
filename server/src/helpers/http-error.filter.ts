import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.getResponse() || null
          : 'Internal Server Error',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }

    Logger.error(
      `${request.method}  ${request.url}`,
      JSON.stringify(errorResponse),
      'Exception Filter',
    );

    response.status(status).json(errorResponse);
  }
}

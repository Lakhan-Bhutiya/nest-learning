import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: HttpException, host: ArgumentsHost): void {
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
  
      const status = exception.getStatus();
  
      const responseBody = {
        success: false,
        statusCode: status,
        message: exception.getResponse(),
        path: request.url,
        timestamp: new Date().toISOString(),
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
  }
  
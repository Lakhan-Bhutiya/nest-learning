import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class CustomInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
  
      const req = context.switchToHttp().getRequest(); // ✅ real request
  
      console.log('Request caught by interceptor');
  
      // headers are lowercase in Node.js
      req.headers['accept-language'] = 'fr';
  
      return next.handle();
    }
  }
  
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthenticationGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      console.log('inside the guard');
  
      const request = context.switchToHttp().getRequest();
  
      // Correct header
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Authorization header missing');
      }
  
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        throw new UnauthorizedException('Token missing');
      }
  
      try {
        const payload = this.jwtService.verify(token);

        request.user = payload; // attach user to request
        console.log(request.user)
        return true; 
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  
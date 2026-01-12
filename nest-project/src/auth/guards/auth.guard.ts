import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Inject,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import Redis from 'ioredis';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Missing authorization header');
      }
  
      const [type, token] = authHeader.split(' ');
      if (type != 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization format');
      }
  
      try {
        
        const payload = this.jwtService.verify(token);
  
        
        const isBlacklisted = await this.redis.get(
          `blacklist:${payload.jti}`,
        );
  
        if (isBlacklisted) {
          throw new UnauthorizedException('Token revoked');
        } 
        
        request.user = payload;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid, expired, or revoked token');
      }
    }
  }
  
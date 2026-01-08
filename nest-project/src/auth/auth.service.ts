import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  // fake user (learning)
  private users = [
    {
      id: 1,
      email: 'test@test.com',
      password: '12345',
    },
  ];

  // 🔐 LOGIN
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);


    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      dto.password,
      user.password,
    );
  
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // access token
    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '15m' },
    );

    // refresh token
    const refreshJti = randomUUID();
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh',
        jti: refreshJti,
      },
      { expiresIn: '7d' },
    );

    await this.redis.set(
      `refresh:${refreshJti}`,
      JSON.stringify({ userId: user.id }),
      'EX',
      7 * 24 * 60 * 60,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  // 🔁 REFRESH (ROTATION)
  async refresh(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    const key = `refresh:${payload.jti}`;
    const exists = await this.redis.get(key);

    if (!exists) {
      throw new UnauthorizedException('Refresh token reused or invalid');
    }

    // 🔥 rotate
    await this.redis.del(key);

    const newJti = randomUUID();

    const newRefreshToken = this.jwtService.sign(
      {
        sub: payload.sub,
        type: 'refresh',
        jti: newJti,
      },
      { expiresIn: '7d' },
    );

    await this.redis.set(
      `refresh:${newJti}`,
      JSON.stringify({ userId: payload.sub }),
      'EX',
      7 * 24 * 60 * 60,
    );

    const newAccessToken = this.jwtService.sign(
      { sub: payload.sub },
      { expiresIn: '15m' },
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  // 🚪 LOGOUT
  async logout(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException();
    }

    await this.redis.del(`refresh:${payload.jti}`);

    return {
      message: 'Logged out successfully',
    };
  }

  async signup(dto: SignupDto) {
    try {
      const user = await this.usersService.createUser(
        dto.email,
        dto.password,
      );
  
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error.message === 'EMAIL_EXISTS') {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }
  
}

import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global() // 👈 makes it available everywhere
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: '127.0.0.1',
          port: 6379,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'], // 👈 VERY IMPORTANT
})
export class RedisModule {}

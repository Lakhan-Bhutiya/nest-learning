import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'nestdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    AuthModule,
    RedisModule,   // 👈 ADD THIS

  ],
})
export class AppModule {}

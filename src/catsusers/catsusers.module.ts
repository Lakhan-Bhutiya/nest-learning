import { Module } from '@nestjs/common';
import { CatsusersService } from './catsusers.service';
import { CatsusersController } from './catsusers.controller';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports : [UsersModule],
  controllers: [CatsusersController],
  providers: [CatsusersService],
  
})
export class CatsusersModule {}

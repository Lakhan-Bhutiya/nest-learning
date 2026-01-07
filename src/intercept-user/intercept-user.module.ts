import { Module } from '@nestjs/common';
import { InterceptUserService } from './intercept-user.service';
import { InterceptUserController } from './intercept-user.controller';

@Module({
  controllers: [InterceptUserController],
  providers: [InterceptUserService],
})
export class InterceptUserModule {}

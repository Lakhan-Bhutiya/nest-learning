import { Module, NestModule, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CatsusersModule } from './catsusers/catsusers.module';
import { Middleware3 } from './middlewares/middleware3';
import middleware1 from './middlewares/middleware1';
import { JwtModule } from '@nestjs/jwt';
import { InterceptUserModule } from './intercept-user/intercept-user.module';
@Module({
  controllers: [],
  imports: [UsersModule,CatsusersModule,
  JwtModule.register({
    global : true,
    secret : 'NothingisSecrete',
    signOptions : {expiresIn : '90s'},
  }),
  InterceptUserModule],
  providers: [Logger],
})
//we implement nestmodule because we want to use the middleware as class
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware3,middleware1)// we can do opposite of forroutes()
      .forRoutes('users');// so here we are specifying the routs where will middleware used not like other       
  }                      // we can use controller too 
}
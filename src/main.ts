import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import middleware1 from "./middlewares/middleware1";
import middleware2 from "./middlewares/middleware2";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleware1);
  app.use(middleware2);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(3000);
}
bootstrap();
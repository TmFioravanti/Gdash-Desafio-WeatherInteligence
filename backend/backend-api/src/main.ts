import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  console.log('JWT_SECRET(main) =>', config.get('JWT_SECRET'));
  console.log('MONGO_URI(main) =>', config.get('MONGO_URI'));

  await app.listen(3000);
}
bootstrap();

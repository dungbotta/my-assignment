import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import AppConfig from './config/AppConfig';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService<AppConfig> = await app.get(ConfigService);
  const a = config.get('FRONTEND_URL')
  app.enableCors();
  await app.listen(3001);
}
bootstrap();

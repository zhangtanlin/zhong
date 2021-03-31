import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/filter/error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter())

  await app.listen(3000);
}
bootstrap();

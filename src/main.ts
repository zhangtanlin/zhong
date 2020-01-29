import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ErrorFilter } from "./common/filter/error.filter";
import * as cors from 'cors';
/**
 * api文档swagger
 */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * 全局错误连接器
   */
  app.useGlobalFilters(new ErrorFilter());
  /**
   * swagger配置
   * @param [setTitle]   - 设置api文档swagger的标题
   * @param [setVersion] - 设置api文档swagger的版本号
   * @param [setHost]    - 设置api文档swagger的基础路径
   */
  const options = new DocumentBuilder()
    .setTitle('主后台管理系统api文档')
    .setVersion('1.0.0')
    .setHost('http://localhost:3000')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  /**
   * 解决跨域
   */
  app.use(
    cors({
      origin: [
        'http://127.0.0.1:3001',
        'http://localhost:3001',
      ],
      credentials: true,
    }),
  );
  /**
   * 绑定端口号
   */
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module'
import { ErrorFilter } from './common/filter/error.filter'
import { port } from "./common/config"
import { join } from 'path';
import * as hbs from 'hbs';

// api文档swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ResultInterceptor } from './common/interceptor/result.interceptor';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  /**
   * 使用nestjs使用的express框架启动服务
   * @param {boolean} [logger] - 是否开启日志
   * @param {boolean} [cors]   - 是否允许跨域
   */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      cors: true
    }
  )

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter())

  /**
   * 全局拦截
   * @function ResultInterceptor 返回值数据结构控制
   */
  app.useGlobalInterceptors(new ResultInterceptor());

  // 模板
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', '/views/partials')); // 设置公共模板
  app.setViewEngine('hbs');

  // socket适配器
  app.useWebSocketAdapter(new WsAdapter(app))

  /**
   * swagger配置
   * @param [setTitle]   - 设置api文档swagger的标题
   * @param [setVersion] - 设置api文档swagger的版本号
   * @param [setHost]    - 设置api文档swagger的基础路径
   * 注意：swagger需要服务 npm run start ,访问地址：http://localhost:3001/swagger/
   */
  const options = new DocumentBuilder()
    .setTitle('主后台管理系统api文档')
    .setDescription('描述文件')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  // 绑定端口号
  await app.listen(port)
}
bootstrap()

import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module'
import { ErrorFilter } from './common/filter/error.filter'
import { corsMethodsArray, corsUrlArray, msPort, port } from "./config"
import { join } from 'path';
import * as hbs from 'hbs';

// api文档swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ResultInterceptor } from './common/interceptor/result.interceptor';
import { WsAdapter } from '@nestjs/platform-ws';

// 微服务
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  /**
   * 使用nestjs使用的express框架启动服务
   * @param {boolean} [logger] - 是否开启日志
   * @param {boolean} [cors]   - 是否允许跨域
   */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  )

  /**
   * 设置允许跨域
   * origin: 允许跨域的地址(字符串或者数组)
   * methods: 允许跨域的请求方式
   * credentials: 别问我我也不知道啥意思，就知道是证书，这个要设置为true
   * optionsSuccessStatus: 成功状态码
   */
  app.enableCors({
    origin: corsUrlArray,
    methods: corsMethodsArray,
    credentials: true,
    optionsSuccessStatus: 200,
  })

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter())

  /**
   * 全局拦截
   * @function ResultInterceptor 返回值数据结构控制
   */
  app.useGlobalInterceptors(new ResultInterceptor());

  /**
   * 模板
   * useStaticAssets:设置模板静态资源目录
   * setBaseViewsDir:设置模板目录
   * registerPartials:设置公共模板
   * setViewEngine:设置模板引擎
   */
  app.useStaticAssets(join(__dirname, '../public'));
  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '../views/partials'));

  // socket适配器
  app.useWebSocketAdapter(new WsAdapter(app))
  
  // 启动主程序的微服务【端口和主程序保持一致】
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: msPort,
    },
  });
  app.startAllMicroservices();

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

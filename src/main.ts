import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/filter/error.filter';
import { ResultInterceptor } from './common/interceptor/result.interceptor';
import { join } from 'path';
import { readFile, } from 'fs';
import { isFolderExist } from './common/utils/file';
import * as hbs from 'hbs';
// api文档swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// 微服务
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// 全局管道
import { CryptoPipe } from './common/pipe/crypto.pipe';
// 全局加解密
import { getKeyPair, saveKeyPairFile } from './common/utils/cryptoData';

async function bootstrap() {
  /**
   * 使用nestjs使用的express框架启动服务
   * @param {boolean} [logger] 是否开启日志
   * @param {boolean} [cors]   是否允许跨域
   */
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // 获取环境变量
  const configService: ConfigService = await app.get(ConfigService);
  let crossUrlString: string = await configService.get('CROSS_URL');
  let crossUrlArr: string[] = [];
  if (crossUrlString) {
    crossUrlArr = crossUrlString.split(',');
  };
  let crossMethodsStr: string = await configService.get('CROSS_METHOD');
  let crossMethodsStrArr: string[] = [];
  if (crossMethodsStr) {
    crossMethodsStrArr = crossMethodsStr.split(',');
  };
  const port: number = await configService.get('NEST_PORT');
  const msPort: number = await configService.get('MS_PORT');

  /**
   * 判定是否生成公钥和私钥
   * @param {function} [isFolderExist]   用来生成ssh文件夹(有就不操作,没有则创建)
   * @param {function} [privateKey]      同步读取的私钥
   * @param {function} [publicKey]       同步读取的公钥
   * @param {function} [getKeyPair]      生成公钥私钥方法
   * @param {function} [saveKeyPairFile] 把公钥私钥保存到本地方法
   */
  isFolderExist(join(__dirname, '../ssh'));
  let tempPrivateKey = null;
  let tempPublicKey = null;
  readFile(
    join(__dirname, '../ssh/private.pem'),
    'utf-8',
    (error, res) => {
      if (!error) {
        tempPrivateKey = res;
      }
    },
  );
  readFile(
    join(__dirname, '../ssh/public.pem'),
    'utf-8',
    (error, res) => {
      if (!error) {
        tempPublicKey = res;
      }
    }
  );
  if (!tempPrivateKey || !tempPublicKey) {
    const { publicKey, privateKey } = getKeyPair();
    saveKeyPairFile(publicKey, privateKey);
  };

  /**
   * 设置允许跨域
   * origin: 允许跨域的地址(字符串或者数组)
   * methods: 允许跨域的请求方式
   * credentials: 别问我我也不知道啥意思,就知道是证书，这个要设置为true
   * optionsSuccessStatus: 成功状态码
   */
  app.enableCors({
    origin: crossUrlArr,
    methods: crossMethodsStrArr,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // 全局管道验证
  app.useGlobalPipes(new CryptoPipe());

  // 全局错误过滤
  app.useGlobalFilters(new ErrorFilter());

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

  // 启动主程序的微服务【所有子微服务的端口需要和主微服务的端口保持一致】
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: msPort,
      retryAttempts: 5,
      retryDelay: 3000,
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
  const swaggerTitle: string = await configService.get('SWAGGER_TITLE');
  const swaggerDescript: string = await configService.get('SWAGGER_DESCRIPTION');
  const swaggerVersion: string = await configService.get('SWAGGER_VERSION');
  const swaggerPathname: string = await configService.get('SWAGGER_PATHNAME');
  const options = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescript)
    .setVersion(swaggerVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPathname, app, document);

  // 绑定端口号
  await app.listen(port);
}
bootstrap();

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 描述
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 安装依赖的方法
```bash
nodejs版本目前使用的^10.13
$ npm install
```

## 运行程序的方法
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

## 测试
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

## 支持
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [更多参考](https://docs.nestjs.com/support).

## 联系方式
- 作者 - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- 网站 - [https://nestjs.com](https://nestjs.com/)
- 推特 - [@nestframework](https://twitter.com/nestframework)

## 执照
  Nest is [MIT licensed](LICENSE).

## 数据库采用mysql,数据库可视化工具MySQLWorkbench

## 缓存采用redis,可视化工具TablePlus

## 命名规则
**内部局部变量:**                           操作表 + 类型【string/Array/object】
                                          操作表 + 字段名 + s + 类型【string/Array/object】
**循环内部用到的变量:**                      temporary + 类型【string/Array/object】
                                          temporary + 字段名 + s + 类型【string/Array/object】
**controller(控制器)方法名:**               操作
**controller(控制器)内调用service（服务）:** service服务名 + 返回数据类型
                                          service服务名 + by + key值【查询单条件】
                                          service服务名 + By + key值 + Array【查询数组】
**service（服务）方法名:**                  typeorm方法名
                                          typeorm方法名 + 操作表
                                          typeorm方法名 + 服务名
                                          操作
**service（服务）内部方法名:**               返回数据类型(名称) + 调用的typeorm方法
                                          调用的typeorm方法 + 返回数据类型(名称)
**dto（验证）方法名:**                      操作表 + . + 增(insert)/删(delete)/改(update)/查(find) + . + dto
**dto（验证）内部方法名:**                   返回数据类型(名称) + 调用的typeorm方法

## 状态码
**2000** 成功
**4000** 参数错误
**4001** 未满足身份认证
**4003** 理解客户端的请求，但是拒绝执行此请求
**4004** 服务器无法找到请求的资源（网页）
**5000** 服务器出错

## host文件写法
一般写法:
ip   域名
表明的是：把某个域名解析到某个ip上，也可以理解为让某个域名可以访问某个ip
<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
<p align="center">
  A progressive
  <a href="http://nodejs.org" target="blank">Node.js</a>
  framework for building efficient and scalable server-side applications, heavily inspired by
  <a href="https://angular.io" target="blank">Angular</a>.
</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore">
    <img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" />
  </a>
  <a href="https://travis-ci.org/nestjs/nest">
    <img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" />
  </a>
  <a href="https://travis-ci.org/nestjs/nest">
    <img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" />
  </a>
  <a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge">
    <img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" />
  </a>
  <a href="https://opencollective.com/nest#backer">
    <img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="https://opencollective.com/nest#sponsor">
    <img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://paypal.me/kamilmysliwiec">
    <img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/>
  </a>
  <a href="https://twitter.com/nestframework">
    <img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow">
  </a>
</p>
<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

###### 描述
这是一个使用**nestjs**构建的应用，包含服务端（含有**api接口**和**管理系统接口**）,<br/>
使用**hbs**作为服务端渲染的模板引擎,<br/>
使用**bulma**作为**ui**框架,<br/>
未完待续......

## 服务器相关
- [centos8下载地址](http://ftp.jaist.ac.jp/pub/Linux/CentOS-vault/8.0.1905/isos/x86_64/)
- [docker部署nestjs方法](https://www.tomray.dev/nestjs-docker-production)

**在linux服务器上开启相关端口的方法**<br />
注意:需要开启redis的6379，mysql的3306，以及我们的nestjs的3000端口。
```bash
# 第一步：查看zone名称命令：
firewall-cmd --get-active-zones
# 显示
public
  interfaces: ens33
# 第二步：开启6379端口命令：
firewall-cmd --zone=public --add-port=6379/tcp --permanent
# 显示
success
# 第三步：重启防火墙命令：
firewall-cmd --reload
# 显示
success
# 第四步：检查端口是否开启命令：
firewall-cmd --query-port=6379/tcp
# 显示
yes
```

###### 运行程序的一些方法
```bash
# 开发环境
$ npm run start
# 开发环境监听
$ npm run start:dev
# 生产环境监听
$ npm run start:prod
```

###### 服务端-测试方法（未学习不知道怎么写）
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```

###### 服务端支持
Nest官网 [地址](https://docs.nestjs.com/support).

###### 联系方式
- 作者 - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- 网站 - [https://nestjs.com](https://nestjs.com/)
- 推特 - [@nestframework](https://twitter.com/nestframework)

###### 执照
  Nest is [MIT licensed](LICENSE).

###### 相关端口定义
**3000** 后端-主程序端口号
**4000** 后端-微服务端口
**5000** 后端-socket服务

###### 服务端-数据存储
- 后端数据库采用**mysql**,数据库可视化工具使用[MySQLWorkbench](https://www.mysql.com/cn/products/workbench/)
- 后端缓存使用**redis**,数据可视化工具使用[Another Redis Desktop Manager](https://www.mysql.com/cn/products/workbench/)

###### 服务端-命名规则
**内部局部变量:**                           操作表 + 类型【string/Array/object】<br/>
                                          操作表 + 字段名 + s + 类型【string/Array/object】<br/>
**循环内部用到的变量:**                      temporary + 类型【string/Array/object】<br/>
                                          temporary + 字段名 + s + 类型【string/Array/object】<br/>
**controller(控制器)方法名:**               操作<br/>
**controller(控制器)内调用service（服务）:** service服务名 + 返回数据类型<br/>
                                          service服务名 + by + key值【查询单条件】<br/>
                                          service服务名 + By + key值 + Array【查询数组】<br/>
**service（服务）方法名:**                  typeorm方法名<br/>
                                          typeorm方法名 + 操作表<br/>
                                          typeorm方法名 + 服务名<br/>
                                          操作<br/>
**service（服务）内部方法名:**               返回数据类型(名称) + 调用的typeorm方法<br/>
                                          调用的typeorm方法 + 返回数据类型(名称)<br/>
**dto（验证）方法名:**                      操作表 + . + 增(insert)/删(delete)/改(update)/查(find) + . + dto<br/>
**dto（验证）内部方法名:**                   返回数据类型(名称) + 调用的typeorm方法<br/>

###### nestjs 自带的错误状态码返回方法
```javascript
BadRequestException           — 400(客户端请求参数错误)
UnauthorizedException         — 401(客户端需要进行身份认证)
ForbiddenException            — 403(客户端带有身份验证，但是这个身份有问题，所以服务端拒绝执行)
NotFoundException             — 404(客户端请求的资源服务器找不到资源)
NotAcceptableException        — 406(客户端请求头的值不符合服务端所需要的请求头)
RequestTimeoutException       — 408(客户端请求超时)
ConflictException             — 409(客户端发送的请求，服务端在处理时冲突了。一般出现在类似put请求时)
GoneException                 — 410(客户端请求的资源以前存在，现在不存在了)
PayloadTooLargeException      — 413(客户端的请求体太大)
UnsupportedMediaTypeException — 415(客户端的请求头/类型/格式错误，不是服务端需要的格式)
UnprocessableEntityException  — 422(客户端的请求头/类型/格式正确，但是对应类型的书写语法错误)
InternalServerErrorException  — 500(服务器出问题了)
NotImplementedException       — 501(服务器无法处理当前的方法)
BadGatewayException           — 502(服务器从上游服务器获取到的信息表示当前响应无效)
ServiceUnavailableException   — 503(服务器维护)
GatewayTimeoutException       — 504(服务器请求上有服务器超时)
```
这里采用nestjs自带的异常处理格式 
```json
{"error": "具体错误信息","message": "错误描述"}。
```
注意：api接口返回的状态字段使用的是**code**字段，至于为什么不采用**status**字段，**是为的是和 http 请求的 status 进行区分**。

## 客户端

###### bulma 样式自定义
步骤一：在 **./theme/reset_bulma.scss** 文件内修改相关的配置;<br/>
步骤二：运行下面的方法，可以供构建和监听 bulma 的 css 样式生成。
```bash
# 构建 bulma 的 css 样式
npm run css-build
# 监听 bulma 依赖更改,进行构建
npm run css-watch
```
注意：这里构建bulma的css时，需要使用node-sass。但是我们现在使用的版本是v18，还没有对应的node-sass版本所以这里暂不使用。

## 打包/部署
###### 打包
由于项目中views/src/public在同一个层级，所以在打包时需要在nestjs-cli.json中配置
```json
  "compilerOptions": {    
    "assets": [
      {
        "include": "../assets",
        "outDir": "dist/public",
        "watchAssets": true
      },
      {
        "include": "../views",
        "outDir": "dist/views",
        "watchAssets": true
      }
    ],
  }
```
这样才会在打包时把public/views两个文件打包到dist文件夹内。
###### 建议使用pm2部署
```javascript
# 在pm2上启动服务
pm2 start --name "在pm2中的名字" main.js
# 设置开机启动
pm2 save
```

## 其他补充知识
涉及到项目所需要使用的一些相关技术。

###### RxJS
-[RxJS中文博主的总结](https://juejin.cn/post/6910943445569765384)

###### 循环、迭代、遍历和递归
loop、iterate、traversal和recursion这几个词是计算机技术书中经常会出现的几个词汇。分别翻译为：循环、迭代、遍历和递归。乍一看，这几个词好像都与重复（repeat）有关，但有的又好像不完全是重复的意思。<br/>
- 循环（loop），指的是在满足条件的情况下，重复执行同一段代码。比如，while语句。
- 迭代（iterate），指的是按照某种顺序逐个访问列表中的每一项。比如，for语句。
- 遍历（traversal），指的是按照一定的规则访问树形结构中的每个节点，而且每个节点都只访问一次。
- 递归（recursion），指的是一个函数不断调用自身的行为。比如，以编程方式输出著名的斐波纳契数列。<br/>
严格来讲，它们似乎都属于算法的范畴。换句话说，它们只不过是解决问题的不同手段和方式，而本质上则都是计算机编程中达成特定目标的途径。其中或者可以说迭代器等于遍历器。

学习：[js中同步异步，Promise，Async/await， Observable](https://blog.csdn.net/jingjingchen1014/article/details/96142466)

###### 全站案例
- [node-nest-vue-nuxt-cms](https://github.com/givebest/node-nest-vue-nuxt-cms)

## docker
- [容器和镜像导入导出的区别](https://www.jianshu.com/p/8408e06b7273)
```bash
# 镜像的保存
docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
tomcat8                   3.0                 90457edaf6ff        6 hours ago         1.036 GB
[root@centos-7 mac]# docker save 9045 > tomcat8-apr.tar
# 镜像的导入(这个方法是没有填写容器名称和容器版本号的)
[root@centos-7 mac]# docker load < tomcat8-apr.tar
60685807648a: Loading layer [==================================================>] 442.7 MB/442.7 MB
[root@centos-7 mac]# yer [>                                                  ] 527.7 kB/442.7 MB
[root@centos-7 mac]# docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
<none>                    <none>              90457edaf6ff        7 hours ago         1.036 GB
# 镜像的重命名和版本号设置
[root@centos-7 mac]# docker tag 9045 tomcat8-apr:3.0
[root@centos-7 mac]# docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
tomcat8-apr               3.0                 90457edaf6ff        7 hours ago         1.036 GB
# 容器作为镜像导出
[root@centos-7 mac]# docker ps 
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                               NAMES
b91d9ad83efa        9045                "/bin/bash"         18 seconds ago      Up 15 seconds                                           trusting_colden
[root@centos-7 mac]# docker export b91d9ad83efa > tomcat80824.tar
注意:镜像导出的文件比容器导出文件大。
# 容器作为镜像导入
[root@centos-7 mac]# docker import tomcat80824.tar
sha256:880fc96a6bb6abdfa949a56d40ef76f32f086fa11024ddcfb4e4e8b22041d5f2
[root@centos-7 mac]# docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
<none>                    <none>              880fc96a6bb6        6 seconds ago       971.9 MB
# 镜像的重命名和版本号设置
[root@centos-7 mac]# docker tag 880f tomcat80824:1.0
[root@centos-7 mac]# docker images
REPOSITORY                TAG                 IMAGE ID            CREATED              SIZE
tomcat80824               1.0                 880fc96a6bb6        About a minute ago   971.9 MB
# 镜像导入和容器导入的区别：
1）容器导入是将当前容器 变成一个新的镜像
2）镜像导入是复制的过程
save 和 export区别：
1）save 保存镜像所有的信息-包含历史
2）export 只导出当前的信息
# 查看当前镜像的历史信息(这也是镜像比容器大的原因)
docker history 880fc96a6bb6
```
- 解决docker内部无法使用vim

``` bash
# 运行这个命令的作用是：同步/etc/apt/sources.list和/etc/apt/sources.list.d中列出的源的索引，这样能获取最新的软件包
apt-get update
# 等更新完毕以后运行命令安装vim
apt-get install vim
```
- 修改nginx之后重启方式
```
# 进入nginx容器内
# 如果使用的是"18-alpine3.15..."等alpine3版本，
# 需要使用"/bin/sh"打开终端,其他的好像是"/bin/bash"或者"bash".

docker exec -it container_nginx /bin/sh
# 重启nginx1:
docker exec nginx-test nginx -s reload
# 重启nginx2:在nginx容器内使用:
nginx -s reload
```
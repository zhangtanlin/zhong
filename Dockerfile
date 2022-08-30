########################################
# nestjs 项目在 docker 上的多阶段部署
# 注意1:多阶段部署中只有最后一个阶段有效果,但是最后一个阶段可以引用其他阶段的数据.
########################################

########################################
# 开发
########################################

# 开发-运行环境
# 注意:使用alpine节点可压缩镜像大小.
FROM node:18.0.0-alpine3.15 As development

# 开发-添加用户
# 注意:默认情况下,映像默认使用超级管理员管理员(root)权限运行,
# 有安全风险,因此使用 USER 在 Dockerfile 中添加用户.
USER root

# 开发-应用目录
WORKDIR /usr/src/nestjs

# 开发-通配符复制 package.json 和 package-lock.json 文件到镜像.
# 注意1:使用 COPY 指令最好添加 --chown=node:node 确保有正确权限.
# 注意2:因为不是多阶段此处的的拷贝只在当前阶段起作用.
COPY --chown=root:root package*.json ./

# 开发-安装应用依赖
# 注意1:运行 npm ci 会删除现有的 node_modules 目录.
# 注意2:使用 npm ci 安装依赖时不会更改 package-lock.json.
RUN npm ci

# 开发-拷贝全部文件到镜像.
COPY --chown=root:root . .

########################################
# 打包
########################################

# 打包-运行环境
FROM node:18.0.0-alpine3.15 As build

# 打包-用户
USER root

# 打包-应用目录
WORKDIR /usr/src/nestjs

# 打包-运行 npm run build,需要使用 Nest CLI 的依赖.
# 注意1:开发阶段已运行 npm ci 安装所需依赖,
# 此阶段仅为了打包(不是正式构建镜像),所以可从开发阶段中复制 node_modules 目录.
# 注意2:因为后面会更新生产依赖,所以需要引入 package*.json.
COPY --chown=root:root package*.json ./
COPY --chown=root:root --from=development /usr/src/nestjs/node_modules ./node_modules

# 打包-把当前引入的资源拷贝到镜像.
COPY --chown=test_user:test_user . .

# 打包-运行构建命令创建生产包
RUN npm run build

# 打包-设置环境变量
# 注意1:使用 NODE_ENV 设置环境变量时,许多库都内置优化 production.
# 注意2:这里设置环境变量是为了构建之后,更新环境.
ENV NODE_ENV production

# 打包-更新依赖项
# 运行 npm ci 会删除现有的 node_modules 目录,
# 传入 --only=production 确保仅安装生产依赖项,尽可能优化
RUN npm ci --only=production && npm cache clean --force

########################################
# 生产
########################################

# 生产-运行环境
FROM node:18.0.0-alpine3.15 As production

# 打包-用户
USER root

# 打包-设置环境变量
# 注意1:使用 NODE_ENV 设置环境变量时,许多库都内置优化 production.
# 注意2:这里设置环境变量是为了构建之后,更新环境.
ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

# 生产-应用目录
WORKDIR /usr/src/nestjs

# 生产-将绑定的代码从构建阶段复制到镜像
COPY --chown=root:root --from=build /usr/src/nestjs/dist ./dist
COPY --chown=root:root --from=build /usr/src/nestjs/node_modules ./node_modules
COPY --chown=root:root --from=build /usr/src/nestjs/package.json ./package.json
COPY --chown=root:root --from=development /usr/src/nestjs/env ./env
COPY --chown=root:root --from=development /usr/src/nestjs/public ./public
COPY --chown=root:root --from=development /usr/src/nestjs/views ./views

# 生产-开放端口
EXPOSE 3000

# 生产-使用生产构架开启服务
CMD ["npm", "run", "start:prod"]

# 构建镜像
# 注意: 最好是使用下划线.
# docker build -t nestjs_image .

# 启动容器
# 注意1: 最好是使用下划线.
# 注意2:"3000:3000"第一个3000表示容器端口,第二个端口表示程序端口.
# 注意3:"--name=zhong-docker"要写在镜像名称前面,写在后面识别不了.
# 注意3:"-d"表示启动之后退出(回复到启动之前的状态).
# 注意4:"--restart=always"表示docker启动时自动运行.
# docker run -p 0.0.0.0:3000:3000 --name=nestjs_container -d --restart=always nestjs_image

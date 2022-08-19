####################
# 构建开发
####################

# 构建开发-运行环境
# 注意:这里使用18.0.0会报错所以改用16.16.0,使用alpine节点是为了压缩镜像大小
FROM node:18.0.0-alpine3.15 As development

# 构建开发-创建应用目录
WORKDIR /usr/src/app

# 构建开发-通配符复制 package.json 和 package-lock.json 文件
# 注意:使用 COPY 指令时，最好添加一个标志以确保用户拥有正确的权限。可以使用(--chown=node:node)来实现.
COPY --chown=test_user:test_user package*.json ./

# 构建开发-安装应用依赖
# 注意: `npm ci` 与 `npm install` 类似，但它旨在用于自动化环境，例如测试平台、持续集成和部署或任何您希望确保干净安装依赖项的情况。
RUN npm ci

# 构建开发-捆绑应用资源
COPY --chown=test_user:test_user . .

# 构建开发-添加用户权限
# 注意:默认情况下，如果未使用 USER 在 Dockerfile 中添加指定指令，映像默认使用 root 权限运行。有安全风险，因此我们将使用 USER 在 Dockerfile 中添加一条指令。
USER test_user

####################
# 构建生产
####################

# 构建生产-运行环境
FROM node:18.0.0-alpine3.15 As build

# 构建生产-应用目录
WORKDIR /usr/src/app

# 构建生产-复制 package.json 和 package-lock.json 文件
COPY --chown=test_user:test_user package*.json ./

# 构建生产-为了运行 `npm run build`，我们需要使用 Nest CLI 的依赖项。之前开发阶段已经运行了 `npm ci`，已安装所有依赖项，所以可以从开发镜像中复制 node_modules 目录
COPY --chown=test_user:test_user --from=development /usr/src/app/node_modules ./node_modules

# 构建生产-捆绑应用资源
COPY --chown=test_user:test_user . .

# 构建生产-运行构建命令创建生产包
RUN npm run build

# 构建生产-设置环境变量
# 注意:使用 NODE_ENV 设置环境变量时，许多库都内置优化 production
ENV NODE_ENV production

# 构建生产-运行 `npm ci` 会删除现有的 node_modules 目录并传入 --only=production 确保仅安装生产依赖项。这样可以确保 node_modules 目录尽可能优化
RUN npm ci --only=production && npm cache clean --force

# 构建生产-添加用户权限
USER test_user

####################
# 生产
####################

# 生产-基础生产镜像
FROM node:18.0.0-alpine3.15 As production

# 生产-应用目录
WORKDIR /usr/src/app

# 生产-将绑定的代码从构建阶段复制生产镜像
COPY --chown=test_user:test_user --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=test_user:test_user --from=build /usr/src/app/dist ./dist

# 生产-使用生产构架开启服务
CMD ["node", "dist/main.js"]

# 构建镜像
# docker build -t zhong-cloud .

# 启动容器
# 注意1:第一个3000表示容器端口，第二个端口表示程序端口。
# 注意2:"--name=zhong-docker"要写在镜像名称前面，写在后面识别不了。
# docker run -p3000:3000 --name=zhong-docker zhong-cloud
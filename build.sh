#!/bin/bash

##############################
# 注意:该脚本主要用于 pm2 部署时使用,和 docker 部署有区别.
##############################

# 主项目-删除dist目录
echo '主项目-删除相关目录'
rm -rf ./dist
rm -rf ./nestjss
rm -rf ./zhong-*.zip

# 主项目-构建
echo '安装生产依赖'
npm ci

# 构建
echo '构建'
npm run build

# 复制相关文件到新文件夹
echo '复制相关文件到新文件夹'
mkdir nestjs
cp -rf ./dist ./nestjs/
cp -rf ./node_modules ./nestjs/
cp -rf ./env ./nestjs/
cp -rf ./public ./nestjs/
cp -rf ./views ./nestjs/
cp -rf ./package.json ./nestjs/

# 打包成zip
echo '主项目-把dist文件夹打包成zip'
now_time=`date +%Y-%m-%d\(%H\:%M\:%S\)`
zip -q -r ./zhong-$now_time.zip ./nestjs

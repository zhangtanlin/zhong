#!/bin/bash

# 主项目-删除dist目录
echo '主项目-删除dist目录'
rm -rf ./dist

# 主项目-构建
echo '主项目-构建'
npm run build

# 主项目-移动waiting.html和error.html到dist/目录
echo '主项目-移动waiting.html和error.html到dist/目录'
cp ./package.json ./dist/

# 打包结束
echo '打包结束'

# 把dist文件夹打包成zip
echo '主项目-把dist文件夹打包成zip'
now_time=`date +%Y-%m-%d\(%H\:%M\:%S\)`
zip -q -r ./zhong-$now_time.zip ./dist

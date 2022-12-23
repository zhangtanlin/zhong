#!/bin/bash

##############################
# docker-compose运行脚本
##############################

# [全局变量]-mysql容器名称
mysqlContainer='mysql8_master'
mysqlImage='mysql'

# [全局操作]清除未挂载(不与容器关联)的所有资源(镜像,容器,卷,网络)
docker system prune --all

# [容器mysql8_master]停止
docker stop $(docker ps -a | grep $mysqlContainer | awk '{print $1}')
# [容器mysql8_master]删除
docker rm -f $(docker ps -a | grep ${mysqlContainer} | awk '{print $1}')

# [镜像mysql]删除
docker rmi $(docker images -q --filter reference=$mysqlImage:*)

# 删除目录内的多余文件
rm -rf ./compose/mysql/mysql8_master/logs/mysqld.log
rm -rf ./compose/mysql/mysql8_master/data/*

# 运行[docker-compose]
docker-compose up -d
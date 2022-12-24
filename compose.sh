#!/bin/bash

##############################
# docker-compose运行脚本
##############################

# [全局变量]-主mysql主容器名称
mysqlMasterContainer='mysql8_master'
# [全局变量]-从mysql容器名称
mysqlSlaveContainer='mysql8_slave'
# [全局变量]-mysql镜像
mysqlImage='mysql'
# [全局变量]-nestjs9镜像(因为容器和镜像名称一样,所以这里只定义一次)
nestjs9Image='nestjs9'


# [全局操作]清除未挂载(不与容器关联)的所有资源(镜像,容器,卷,网络)
docker system prune --all


# [停止mysql主容器mysql8_master]
docker stop $(docker ps -a | grep $mysqlMasterContainer | awk '{print $1}')
# [删除mysql主容器mysql8_master]
docker rm -f $(docker ps -a | grep ${mysqlMasterContainer} | awk '{print $1}')
# [停止mysql从容器mysql8_slave]
docker stop $(docker ps -a | grep $mysqlSlaveContainer | awk '{print $1}')
# [删除mysql从容器mysql8_slave]
docker rm -f $(docker ps -a | grep ${mysqlSlaveContainer} | awk '{print $1}')
# [删除mysql镜像]
docker rmi $(docker images -q --filter reference=$mysqlImage:*)


# [停止nestjs9容器]
docker stop $(docker ps -a | grep $nestjs9Image | awk '{print $1}')
# [删除nestjs9容器]
docker rm -f $(docker ps -a | grep ${nestjs9Image} | awk '{print $1}')
# [删除nestjs9镜像]
docker rmi $(docker images -q --filter reference=$nestjs9Image:*)


# 删除-mysql主服务器数据
rm -rf ./compose/mysql/mysql8_master/logs/mysqld.log
rm -rf ./compose/mysql/mysql8_master/data/*
# 删除-mysql从服务器数据
rm -rf ./compose/mysql/mysql8_slave/logs/mysqld.log
rm -rf ./compose/mysql/mysql8_slave/data/*


# 运行[docker-compose]
docker-compose up -d

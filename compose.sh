#!/bin/bash


## docker-compose运行脚本


## [全局变量]-主mysql主容器名称
mysqlMasterContainer='mysql8_master'
## [全局变量]-从mysql容器名称
mysqlSlaveContainer='mysql8_slave'
## [全局变量]-mysql镜像
mysqlImage='mysql'
## [全局变量]-redis容器
redisContainer='redis6'
## [全局变量]-redis镜像
redisImage='redis'
## [全局变量]-nestjs9镜像(因为容器和镜像名称一样,所以这里只定义一次)
nestjs9Image='nestjs9'


## [停止mysql主容器mysql8_master]
docker stop $(docker ps -a | grep $mysqlMasterContainer | awk '{print $1}')
## [删除mysql主容器mysql8_master]
docker rm -f $(docker ps -a | grep ${mysqlMasterContainer} | awk '{print $1}')
## [停止mysql从容器mysql8_slave]
docker stop $(docker ps -a | grep $mysqlSlaveContainer | awk '{print $1}')
## [删除mysql从容器mysql8_slave]
docker rm -f $(docker ps -a | grep ${mysqlSlaveContainer} | awk '{print $1}')
## [停止redis容器redis6]
docker stop $(docker ps -a | grep $redisContainer | awk '{print $1}')
## [删除redis容器redis6]
docker rm -f $(docker ps -a | grep ${redisContainer} | awk '{print $1}')
## [停止nestjs9容器]
docker stop $(docker ps -a | grep $nestjs9Image | awk '{print $1}')
## [删除nestjs9容器]
docker rm -f $(docker ps -a | grep ${nestjs9Image} | awk '{print $1}')


## [删除mysql镜像]
docker rmi $(docker images -q --filter reference=$mysqlImage:*)
## [删除redis镜像]
docker rmi $(docker images -q --filter reference=$redisImage:*)
## [删除nestjs9镜像]
docker rmi $(docker images -q --filter reference=$nestjs9Image:*)


## [全局操作]清除所有资源(镜像,容器,网络)
##   注意1:这里如果要删除卷需要添加参数(--volums).
##   注意2:这个方法可以替代下面的四个方法,是一种全局的简写.
docker system prune --volumes
## [全局操作]清除未使用的容器
# docker container prune
## [全局操作]清除未使用的镜像
# docker image prune
## [全局操作]清除卷
# docker volume prune
## [全局操作]清除网络
# docker network prune


## 删除-mysql主服务器数据
rm -rf ./compose/mysql/mysql8_master/logs/*
rm -rf ./compose/mysql/mysql8_master/data/*
## 删除-mysql从服务器数据
rm -rf ./compose/mysql/mysql8_slave/logs/*
rm -rf ./compose/mysql/mysql8_slave/data/*
## 删除-redis数据
# rm -rf ./compose/redis/data/*


## 运行[docker-compose]
docker-compose up -d

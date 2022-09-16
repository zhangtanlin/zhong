####################
# mysql 的 Dockerfile 配置文件
####################

# 镜像
FROM mysql:8.0.30-oracle

# 默认创建一个数据库-数据库名字
# ENV MYSQL_DATABASE website
# root 密码
# ENV MYSQL_ROOT_PASSWORD Qaz@123456
# root host
# ENV MYSQL_ROOT_HOST '%'
# 新建用户
# 注意:不能是 root,因为会报错,后面需要给新用户赋予权力.
# ENV MYSQL_USER admin
# 新建用户的密码
# ENV MYSQL_PASSWORD Qaz@123456
# 访问端口
ENV MYSQL_PORT 3306

# 定义会被容器自动执行的目录
ENV AUTO_RUN_DIR ./docker-entrypoint-initdb.d

# 定义初始化sql文件
ENV INIT_SQL ./init

# 把要执行的sql文件放到/docker-entrypoint-initdb.d/目录下，容器会自动执行这个sql
COPY ./$INIT_SQL $AUTO_RUN_DIR/

# 复制配置文件到相关目录
ADD ./my.cnf /etc/mysql/mysql.conf.d/my.cnf

# 给执行文件增加可执行权限
RUN chmod a+x $AUTO_RUN_DIR/$INIT_SQL

# 暴露端口
EXPOSE $MYSQL_PORT
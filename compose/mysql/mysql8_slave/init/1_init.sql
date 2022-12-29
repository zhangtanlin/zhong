-- 切换到默认[mysql]数据库
use mysql;


-- 创建[mysql8_slave1]用户
create user 'mysql8_slave1'@'%' identified by 'Qaz@123456';
-- 赋权[mysql8_slave1]用户.
-- 注意:这里不用使用[use website;]因为是在[mysql]下创建的全局用户.
grant all privileges on *.* to 'mysql8_slave1'@'%';


-- 创建[slave2]用户,用以给子从库访问
create user 'slave2'@'%' identified by 'slave2123456';
-- 赋权[slave2]用户-从库可访问主库.
grant replication slave on *.* to 'slave2'@'%';


-- 刷新权限
flush privileges;

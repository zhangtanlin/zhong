-- 切换到默认[mysql]数据库
use mysql;


-- 创建[mysql8_admin]用户
create user 'mysql8_admin'@'%' identified by 'Qaz@123456';
-- 赋权[mysql8_admin]用户.
-- 注意:这里不用使用[use website;]因为是在[mysql]下创建的全局用户.
grant all privileges on *.* to 'mysql8_admin'@'%';


-- 创建[slave1]用户,用以给从库访问
create user 'slave1'@'%' identified by 'slave1123456';
-- 赋权[slave1]用户-从库可访问主库.
grant replication slave on *.* to 'slave1'@'%';


-- 刷新权限
flush privileges;

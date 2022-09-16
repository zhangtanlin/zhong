-- 创建数据库
CREATE DATABASE  `website` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建普通用户
-- Qaz@123456 表示定义的密码
create user 'admin'@'127.0.0.1' identified by 'Qaz@123456';

-- 授权
-- *.* 表示匹配所有数据表
-- test@'%' 表示获取权限的用户
grant all privileges on *.* to 'admin'@'127.0.0.1' with grant option;

-- 刷新权限
flush privileges;

-- 切换到指定数据库
use website;

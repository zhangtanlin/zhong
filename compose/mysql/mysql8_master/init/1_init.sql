-- mysql初始化给[docker-compose]创建的用户[mysql8_admin]赋予权限.
-- 注意:这里不用使用[use website;]因为docker-compose创建的用户是全局的.
-- 比如想给用户[nacos]赋予数据库[test]数据库所有的表的权限,并且不限制[nacos]用户的连接地址,代码为[grant all privileges on test.* to 'nacos'@'%';].
grant all privileges on *.* to 'mysql8_admin'@'%';

-- 刷新权限
flush privileges;
-- 停止从服务器连接主服务器
stop slave;

-- 重置从服务器的设置
reset slave;

-- 从服务器连接主服务器
change master to master_host="mysql8_master",
master_user="mysql8_admin",
master_password="Qaz@123456",
master_port=3306,
master_auto_position=1;

-- 重启从服务器
start slave;

-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: website
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `age` int DEFAULT NULL,
  `area_id` char(6) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '000000',
  `activate_time` datetime NOT NULL DEFAULT '2020-12-23 16:16:49',
  `locked_time` datetime DEFAULT NULL,
  `disabled_time` datetime DEFAULT NULL,
  `last_login_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `last_login_time` datetime DEFAULT NULL,
  `last_update_password_time` datetime DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT '2020-12-23 16:16:49',
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `firm` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `roles` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '1',
  `is_first_login` enum('0','1') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '1',
  `is_locked` enum('0','1') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  `is_disabled` enum('0','1') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'root','超级管理员','6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b','','12425632566','',NULL,'000000','2020-06-18 13:42:35',NULL,NULL,'',NULL,NULL,'2020-06-18 13:42:35','','','1,2','1','1','0','0'),(2,'admin','操作员','6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b','','15235633333','',NULL,'000000','2020-06-18 13:42:35',NULL,NULL,'',NULL,NULL,'2020-06-18 13:42:35','','','2,3','1','1','0','0'),(3,'audit','审计员','6d67d2209e45e3d74d853e82481010abb8570fd82ffa74821d091cbd6c8244d967f2a3402f1715039cf1046ef46589ec57ea44e970b90128f5d11cedfbbf150b','','','',NULL,'000000','2020-06-18 13:42:35',NULL,NULL,'',NULL,NULL,'2020-06-18 13:42:35','','','3','1','1','0','0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-23 18:07:42

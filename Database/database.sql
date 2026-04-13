-- MySQL init script for vacation_app
-- ------------------------------------------------------

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `likes`;
DROP TABLE IF EXISTS `vacations`;
DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daniel','Machluf','danielmachluf4200@gmail.com','51e86e1d79caa82d54d0d64eb06f3498e9740303de521b7fdce0ba0519d340e77d8c75efe76474516dae924cee8da736fb1586ae13320a1df25309279863fb62','admin'),(2,'Daniel','Machluf','danielmachluf420@gmail.com','51e86e1d79caa82d54d0d64eb06f3498e9740303de521b7fdce0ba0519d340e77d8c75efe76474516dae924cee8da736fb1586ae13320a1df25309279863fb62','admin'),(3,'daniel','machluf','mactur3333@gmail.com','51e86e1d79caa82d54d0d64eb06f3498e9740303de521b7fdce0ba0519d340e77d8c75efe76474516dae924cee8da736fb1586ae13320a1df25309279863fb62','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` int unsigned NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`vacationId`),
  KEY `idx_vacations_startDate` (`startDate`),
  KEY `idx_vacations_endDate` (`endDate`),
  CONSTRAINT `chk_vacation_dates` CHECK ((`endDate` >= `startDate`)),
  CONSTRAINT `chk_vacation_price` CHECK (((`price` >= 0) and (`price` <= 10000)))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris Updated','Updated description','2026-05-10','2026-05-15',1500.00,'paris.jpg'),(2,'Rome','Historic sites, piazzas and culinary tour','2026-09-30','2026-10-06',1100.00,'rome.jpeg'),(3,'Sydney','Harbour, beaches and coastal walks','2026-12-04','2026-12-11',1900.00,'sydney.jpeg'),(4,'Cusco','Machu Picchu trek and Andean cultural tours','2026-07-31','2026-08-09',1700.00,'cusco.jpeg'),(5,'Santorini','Sunset caldera views and cliffside dining','2026-06-09','2026-06-15',1600.00,'santorini.jpeg'),(6,'Cape Town','Table Mountain, vineyards and coastal drives','2026-04-14','2026-04-21',1300.00,'cape town.jpeg'),(7,'Reykjavik','Northern lights, glacier hikes and hot springs','2026-11-09','2026-11-16',2000.00,'reyklajk.jpeg'),(8,'Bali','Beach villas, yoga retreats and rice terrace tours','2026-06-30','2026-07-09',1400.00,'bali.jpeg'),(9,'New York','City lights, Broadway shows and museum passes','2026-09-04','2026-09-11',1500.00,'new york.jpeg'),(10,'Tokyo','Cherry blossom sightseeing and sushi tour','2026-03-19','2026-03-26',1800.00,'tokyo.jpeg'),(11,'Thailand','enjoy thailand','2026-04-05','2026-04-23',499.97,'thailand.jpeg'),(12,'Los Angeles','Explore LA: beaches, Hollywood, nightlife, and iconic sights in one unforgettable trip.','2026-04-24','2026-05-14',300.00,'los_angeles.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int unsigned NOT NULL,
  `vacationId` int unsigned NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `idx_likes_vacationId` (`vacationId`),
  CONSTRAINT `fk_likes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_vacations` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (3,1),(3,4),(3,5),(3,6),(3,8),(3,9),(3,10),(3,11);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-13 11:48:47

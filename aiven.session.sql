-- MariaDB dump 10.19-11.7.2-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: herbalism_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
-- MariaDB dump 10.19-11.7.2-MariaDB, for osx10.19 (arm64)
--
-- Host: localhost    Database: herbalism_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `apartment` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `zipCode` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES
('70c04214-655e-4973-b345-165e8198f764','5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa','Le','41c, ap My Thanh, xa My Phong','VN','','My Tho','Hồ Chí Minh','2600','2025-04-21 07:04:24','2025-04-21 07:04:24'),
('75b4a127-3d5c-4d26-ba26-b77dbf8ed848','5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa ','Le','kkktest address','VN','kkk','My Tho','Hà Nội','1','2025-04-21 08:05:12','2025-04-21 08:05:12');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `mail_2` (`mail`),
  UNIQUE KEY `mail_3` (`mail`),
  UNIQUE KEY `mail_4` (`mail`),
  UNIQUE KEY `mail_5` (`mail`),
  UNIQUE KEY `mail_6` (`mail`),
  UNIQUE KEY `mail_7` (`mail`),
  UNIQUE KEY `mail_8` (`mail`),
  UNIQUE KEY `mail_9` (`mail`),
  UNIQUE KEY `mail_10` (`mail`),
  UNIQUE KEY `mail_11` (`mail`),
  UNIQUE KEY `mail_12` (`mail`),
  UNIQUE KEY `mail_13` (`mail`),
  UNIQUE KEY `mail_14` (`mail`),
  UNIQUE KEY `mail_15` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES
('e19b57bd-33d1-4fbd-a6ac-25611f48fe04','Khoa Admin','lekhoaadmin@gmail.com','12345678','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articleCategories`
--

DROP TABLE IF EXISTS `articleCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articleCategories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articleCategories`
--

LOCK TABLES `articleCategories` WRITE;
/*!40000 ALTER TABLE `articleCategories` DISABLE KEYS */;
INSERT INTO `articleCategories` VALUES
('70c8b82d-54f7-48f8-9e67-886669c3a6d6','kkkkkkkkk','2025-04-14 05:08:27','2025-04-14 05:08:27'),
('a49d2a1a-395d-499e-aad2-391609534c2e','Cleansing','2025-04-14 06:06:27','2025-04-14 06:06:27'),
('e19b57bd-33d1-4fbd-a6ac-25611f48fe02','noCate','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `articleCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `adminId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `shortDescription` text,
  `categoryId` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adminId` (`adminId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES
('0627f9a7-deed-4e75-baf9-6b9e0200e033','1','<p>3</p><p><img src=\"http://localhost:3000/uploads/1744602914231-07r1teaox4e.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 03:55:14','2025-04-14 03:55:14','http://localhost:3000/uploads/1744602914244-457j7984dvb.jpeg','2','e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('1c22f515-2d69-42b5-a851-4e4916ba4303','title','<p>123</p><p><img src=\"http://localhost:3000/uploads/1744509891321-mv4ox5mzv8j.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-13 02:04:51','2025-04-13 02:04:51','http://localhost:3000/uloads/1744509891364-j0m8e6498gg.jpg','short','e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('3339462b-a04b-4b8e-9525-9405aa9464f6','test','<p>1<img src=\"http://localhost:3000/uploads/1744468472200-b0iztfbv3sg.png\">2<img src=\"http://localhost:3000/uploads/1744468472214-q2ema479xw8.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-12 14:43:45','2025-04-12 14:43:45',NULL,NULL,'e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('8c49f5fb-0498-40a2-8913-fb07a7e5ba26','Revive & Thrive: The Benefits of Cleansing','<p>Spring is the perfect time to \'tune-up\' the body\'s internal filtration system and clear out toxins after a long winter. Despite having its own innate detoxification channels, cleansing herbs can support the body in this process, promoting overall vitality and well-being.</p><p><strong>Disclaimer: </strong>This blog is for educational purposes only and is not a substitute for medical advice. Please consult your health care practitioner before adding any new herbs to your wellness routine or embarking on a seasonal cleanse.</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 06:06:27','2025-04-14 06:06:27','http://localhost:3000/uploads/1744610786578-qkxnh24gokb.webp','Spring is the perfect time to \'tune-up\' the body\'s internal filtration system and clear out toxins after a long winter. Despite having its own innate detoxification channels, cleansing herbs can support the body in this process, promoting overall vitality and well-being.','a49d2a1a-395d-499e-aad2-391609534c2e'),
('96e2b72d-a41e-4544-9aa6-35f47f13c267','Antioxidant-Rich Products for Healthy Aging','<p>The global population of seniors (those age 60-65) is expected to double by the year 2050, with many people looking for ways to turn back the clock. Recent research has shown remarkable progress on reversing biological aging, and maintaining cellular wellness by prioritizing antioxidant intake is a great place to start.</p><p><strong>Disclaimer:</strong> This blog is for educational purposes only and is not a substitute for medical advice. Please consult your health care practitioner before adding any new herbs to your wellness routine.</p><h3>The Dangers of Free Radicals</h3><p>Free radicals are unstable atoms that can damage cells. They can be generated by exposure to electromagnetic fields (predominantly due to electronic use), ultraviolet light, stress, smoke, alcohol, and several other factors. Over time, free radical buildup can cause enough damage to result in illness and aging.</p><p>One of the best ways to prevent this is by increasing antioxidant intake. Antioxidants are a type of molecule that combat free radical damage by preventing their formation, scavenging them, or supporting their decomposition (1).</p><h3>The Role of Ergothioneine</h3><p>Ergothioneine (ET) is a naturally occurring amino acid and a potent antioxidant, known for its ability to combat free radical damage. Often identified as a dietary supplement, or as an anti-aging ingredient in personal care products, ET can be found in fermented foods, culinary mushrooms, and medicinal mushrooms.</p><p>Studies have shown that this amino acid is able to improve vascularity, muscle mass, and muscle stem cell content – enhancing endurance as a result. This study also noted that ET stimulated an increase in NAD+, a vital coenzyme that supports energy metabolism, DNA repair, and cellular signaling. This suggests that ET can have a rejuvenating effect, preserving cellular function (2).</p><h3>Antioxidant-Rich Products for Healthy Aging</h3><h4>5 Mushroom Blend</h4><p>We’ve combined the power of the world’s top 5 function mushrooms to create our 5 Mushroom Blend. Chaga, cordyceps, lion’s mane, reishi, and turkey tail provide a rich source of antioxidants – including ergothioneine – among other potent benefits. When used synergistically, these mushrooms promote balance in the body by supporting immunity, energy, cognitive function, stress resilience, and digestion (3, 4, 5). Learn more about functional mushrooms <strong><a href=\"https://harmonicarts.ca/blogs/mushrooms-101\" rel=\"noopener noreferrer\" target=\"_blank\">here</a></strong>.</p><h4>Shilajit</h4><p>Shilajit’s rich fulvic acid content makes it a powerhouse at combating oxidative damage – even rivalling the antioxidant levels found in blueberries. This also makes Shilajit a complement activator, stimulating the production of antibodies to dispose of damaged cells within the body (6). By preventing and combating free radical damage, Shilajit can delay visible signs of aging.</p><h4>Liver TLC Herbal Tincture Blend</h4><p>Liver TLC is packed with liver-protective herbs that promote gentle cleansing and detoxification. Dandelion is a bitter herb that stimulates liver function, combats free-radicals, and prevents fibrosis of the liver from taking form (7). Milk thistle contains an active compound called silymarin that is packed with antioxidants. It also works to soothe liver inflammation (8).</p><h4>Bio-Shield Herbal Tincture Blend</h4><p>Bio-Shield is intentionally formulated with antioxidant-rich herbs that can support detoxification and immune function. Bladderwrack has been shown to have the highest free radical scavenging activity, along with the highest antioxidant capacity, compared to other seaweeds (9). Burdock can detoxify the liver against a variety of harmful chemicals and heavy metals by stimulating liver enzyme function. It’s packed with antioxidants, prebiotics, and anti-inflammatory compounds (10). Learn more about preventing free radical damage with this formula <strong><a href=\"https://harmonicarts.ca/blogs/nourish-with-nature/preventing-free-radical-damage-with-bio-shield\" rel=\"noopener noreferrer\" target=\"_blank\">here</a></strong>.</p><h4>Elderberry Syrup</h4><p>Elderberries are packed with antioxidant, anti-inflammatory, antimicrobial, and neuroprotective properties, along with high levels of vitamin C (11). As a result, this potent herb can shorten the duration of cold and flu symptoms while modulating the immune system and combatting free radical damage.</p><p><strong><a href=\"https://harmonicarts.ca/collections/antioxidant-rich\" rel=\"noopener noreferrer\" target=\"_blank\">Click here</a></strong> to explore more antioxidant-rich products.</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 06:30:50','2025-04-14 06:30:50','http://localhost:3000/uploads/1744612250171-45p349kzsrc.webp','The global population of seniors (those age 60-65) is expected to double by the year 2050, with many people looking for ways to turn back the clock. Recent research has shown remarkable progress on reversing biological aging, and maintaining cellular wellness by prioritizing antioxidant intake is a great place to start.','a49d2a1a-395d-499e-aad2-391609534c2e'),
('9ce899ce-cb53-4b6d-b246-c53fd5c7e16f','123','<p>123</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 05:08:27','2025-04-14 05:08:27','http://localhost:3000/uploads/1744607307333-50ch1x9nf5e.jpg','321','70c8b82d-54f7-48f8-9e67-886669c3a6d6'),
('bef24178-cdf0-4614-ad61-84e506b86e41','t','<p><img src=\"http://localhost:3000/uploads/1744602675716-4bla3vd74hm.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 03:51:16','2025-04-14 03:51:16','http://localhost:3000/uploads/1744602675726-s7edhlwm1wd.jpg','123','e19b57bd-33d1-4fbd-a6ac-25611f48fe02');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES
('5da6594c-1057-42e0-b7b6-cc2c224f1abb','2025-04-13 05:14:52','2025-04-13 05:14:52','5da6594c-1057-42e0-b7b6-cc2c224f1abf');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `num` int NOT NULL,
  `size` varchar(20) NOT NULL,
  `cartId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartId` (`cartId`),
  KEY `productId` (`productId`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES
('646b18c7-4f31-4aa5-8f9a-5e439fcb03ee',7,'100ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','3538f758-77d4-40cc-97a6-703c0352e736','2025-04-26 01:42:54','2025-04-26 01:42:54'),
('6a5381cf-87e0-4dcc-892c-3665abbe8e6f',2,'L','5da6594c-1057-42e0-b7b6-cc2c224f1abb','262399e3-a04f-4181-8c85-7d90888053eb','2025-04-26 15:51:03','2025-04-26 15:51:03'),
('9809313c-e267-42fb-9e38-e9a424e18d8a',16,'50ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','3538f758-77d4-40cc-97a6-703c0352e736','2025-04-17 06:53:21','2025-04-26 01:42:49'),
('c106b890-e6e5-4d7e-aa10-1b2321475d19',3,'100ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','c80de0fe-653d-4445-9bdc-e692e521a151','2025-04-26 15:51:17','2025-04-26 15:51:17');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `comments_ibfk_67` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
('0505e4df-2304-4ea1-9ec8-32aad3d66d4f','Cái gì lạ v\n','b31cdc4d-50d8-45cd-be0e-c170ef40853f','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-26 01:41:29','2025-04-26 01:41:29',5),
('2452e5b4-9925-4265-8e92-546d3b230d34','Đỉnhhhhh','3538f758-77d4-40cc-97a6-703c0352e736','','2025-04-17 13:04:10','2025-04-17 13:04:10',5),
('2452e5b4-9925-4265-8e92-546d3b230d3a','kkk','fb29babb-9948-46ec-84a8-15ffd416a4d2','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-26 12:11:34','2025-04-26 12:11:34',2),
('bfc5ac60-ca9d-4934-8a8a-df32a4b6a31e','Đỉnhhhhh','3538f758-77d4-40cc-97a6-703c0352e736','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-17 13:04:10','2025-04-17 13:04:10',5),
('eb5bea5b-3d7b-473f-94cd-1ea48bc1e115','hêh','c80de0fe-653d-4445-9bdc-e692e521a151','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-05-01 03:11:27','2025-05-01 03:11:27',2);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `mail_2` (`mail`),
  UNIQUE KEY `mail_3` (`mail`),
  UNIQUE KEY `mail_4` (`mail`),
  UNIQUE KEY `mail_5` (`mail`),
  UNIQUE KEY `mail_6` (`mail`),
  UNIQUE KEY `mail_7` (`mail`),
  UNIQUE KEY `mail_8` (`mail`),
  UNIQUE KEY `mail_9` (`mail`),
  UNIQUE KEY `mail_10` (`mail`),
  UNIQUE KEY `mail_11` (`mail`),
  UNIQUE KEY `mail_12` (`mail`),
  UNIQUE KEY `mail_13` (`mail`),
  UNIQUE KEY `mail_14` (`mail`),
  UNIQUE KEY `mail_15` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES
('5da6594c-1057-42e0-b7b6-cc2c224f1ab4','Khoa cus2','khoacus2@gmail.com','12345678','0708103015','2062-08-01 22:46:13','2062-08-01 22:46:13'),
('5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa cus','khoacus@gmail.com','12345678','0708103015','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `paymentMethod` text NOT NULL,
  `transactionId` text NOT NULL,
  `status` enum('pending','paid','failed') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `size` varchar(20) NOT NULL,
  `num` int NOT NULL,
  `price_at_order` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES
('0a3d7b93-38bc-409c-b05b-f1c6fd2b839c','0462b412-b53b-4bbd-8727-e90aa512396a','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',2,1000.00,'2025-04-17 01:27:40','2025-04-17 01:27:40'),
('37e8f233-562b-4425-bb69-5a51e491dc03','8d2c70d3-31b7-419c-a473-2a3d6f407de1','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',2,1000.00,'2025-04-17 01:23:32','2025-04-17 01:23:32'),
('93a7a0df-364c-41ad-ade5-eb9fef888cfa','0e61c8ae-f17d-4107-98a4-38d8613b251f','262399e3-a04f-4181-8c85-7d90888053eb','L',3,10000.00,'2025-04-16 10:20:38','2025-04-16 10:20:38'),
('a42d23ae-fbea-4c62-9166-270aa005c660','0462b412-b53b-4bbd-8727-e90aa512396a','3538f758-77d4-40cc-97a6-703c0352e736','100ml',2,1000.00,'2025-04-17 01:27:40','2025-04-17 01:27:40'),
('bdb3cab5-0328-4d46-812d-10ad6f24bc3c','0e61c8ae-f17d-4107-98a4-38d8613b251f','3538f758-77d4-40cc-97a6-703c0352e736','50ml',2,1000.00,'2025-04-16 10:20:38','2025-04-16 10:20:38'),
('daca830b-27bb-471a-b086-ca0a3fcd9ffb','8d2c70d3-31b7-419c-a473-2a3d6f407de1','3538f758-77d4-40cc-97a6-703c0352e736','100ml',2,1000.00,'2025-04-17 01:23:32','2025-04-17 01:23:32'),
('db33a1ca-20ac-470a-9b38-52aefdd882aa','bdef62e9-a686-4b54-8723-ade98f79c4c4','3538f758-77d4-40cc-97a6-703c0352e736','50ml',10,1000.00,'2025-04-17 01:35:43','2025-04-17 01:35:43');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `addressId` varchar(255) DEFAULT NULL,
  `trackingNumber` text,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
('0462b412-b53b-4bbd-8727-e90aa512396a','5da6594c-1057-42e0-b7b6-cc2c224f1abf',34000.00,'pending','2025-04-17 01:27:40','2025-04-17 01:27:40',NULL,NULL),
('0e61c8ae-f17d-4107-98a4-38d8613b251f','5da6594c-1057-42e0-b7b6-cc2c224f1abf',62000.00,'pending','2025-04-16 10:20:38','2025-04-16 10:20:38',NULL,NULL),
('8d2c70d3-31b7-419c-a473-2a3d6f407de1','5da6594c-1057-42e0-b7b6-cc2c224f1abf',34000.00,'pending','2025-04-17 01:23:32','2025-04-17 01:23:32',NULL,NULL),
('bdef62e9-a686-4b54-8723-ade98f79c4c4','5da6594c-1057-42e0-b7b6-cc2c224f1abf',40000.00,'pending','2025-04-17 01:35:42','2025-04-17 01:35:42',NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productForms`
--

DROP TABLE IF EXISTS `productForms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productForms` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productForms`
--

LOCK TABLES `productForms` WRITE;
/*!40000 ALTER TABLE `productForms` DISABLE KEYS */;
INSERT INTO `productForms` VALUES
('27071ed5-44c9-46f3-89e8-28d704b3bf58','Apple','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('40eee29e-1b5f-4d72-a39e-5a0b5923b11c','Banana','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('44603db9-8050-404b-a210-d15749b904e5','Tincture','2025-04-14 16:59:28','2025-04-14 16:59:28');
/*!40000 ALTER TABLE `productForms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productImages`
--

DROP TABLE IF EXISTS `productImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productImages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `url` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productImages`
--

LOCK TABLES `productImages` WRITE;
/*!40000 ALTER TABLE `productImages` DISABLE KEYS */;
INSERT INTO `productImages` VALUES
('0228e019-394b-40bd-b9d7-c6758b63364b','3538f758-77d4-40cc-97a6-703c0352e736','http://localhost:3000/uploads/1744680756393-l5j2futtq3d.webp','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('19b1fcba-50ac-4523-8086-db4f767b58e3','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190169-0irfegw8rkto.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2b00ea0d-e89c-43c0-87fa-dedbd18bdf7e','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190152-ebx14y9flfi.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2cb28b43-1298-40cf-bbba-b185fcea9ea6','b31cdc4d-50d8-45cd-be0e-c170ef40853f','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 02:42:11','2025-04-13 02:42:11'),
('3fe556a1-2b8a-4503-b2af-ce79cb6016db','c80de0fe-653d-4445-9bdc-e692e521a151','http://localhost:3000/uploads/1744649898764-4mm4ybwfhau.webp','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('410420ef-5c34-4002-9fd2-2cf4cad3366e','c80de0fe-653d-4445-9bdc-e692e521a151','http://localhost:3000/uploads/1744649898802-xvk8jv97rr9.webp','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('52ec694b-5601-4d1e-bbcf-2e44b142ba41','262399e3-a04f-4181-8c85-7d90888053eb','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('8b2d5e39-1eb1-4248-9a1a-97a801225966','fb29babb-9948-46ec-84a8-15ffd416a4d2','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 02:46:49','2025-04-13 02:46:49'),
('9fcb805f-5b85-442d-b1bb-11a549283809','262399e3-a04f-4181-8c85-7d90888053eb','http://localhost:3000/uploads/1744521291595-olsvg09rgp.webp','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('dda87c7a-399b-4bc6-89fb-cf419418413c','3538f758-77d4-40cc-97a6-703c0352e736','http://localhost:3000/uploads/1744680756378-iwhpjnd5v5.webp','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('f9d144e1-6bce-4eec-8bde-415830474ba3','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190142-ioqvy8txigp.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51');
/*!40000 ALTER TABLE `productImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rate` float NOT NULL DEFAULT '0',
  `content` text,
  `typeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `formId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `needId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
('1347f7ec-a0e1-4738-8ecc-b54905fced3e','Lion\'s Mane Spagyric Tincture',10000.00,0,'Lion’s Mane (Hericium erinaceus) is carefully selected and cultivated from clean, trusted sources, grown under natural conditions with proper technical standards. The extraction process is done by hand, with meticulous attention at every step, honoring the original integrity and natural essence of the mushroom. \nFor centuries, Lion’s Mane has been regarded as a gift from nature, often mentioned in Eastern traditions as a companion to inner clarity and mental presence. Many incorporate it into their daily routines as a way to stay centered, support focus during work, and reconnect with a sense of calm from within. \nOur extract is crafted using the spagyric method — an ancient alchemical approach that combines herbal knowledge with philosophical depth. This process yields a full-spectrum essence, preserving the natural complexity of the mushroom. It is a meaningful choice for those seeking a deeper connection with themselves and a sense of balance amidst the movement of modern life.','236d0f77-de2f-420b-ae9e-cc8c94ae524f','44603db9-8050-404b-a210-d15749b904e5','948a1a61-00ef-4382-bf46-1119acf376f8','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('262399e3-a04f-4181-8c85-7d90888053eb','kkk',10000.00,0,'213','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','27071ed5-44c9-46f3-89e8-28d704b3bf58','f3994323-a03b-4b7b-9b9f-a856f9036357','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('3538f758-77d4-40cc-97a6-703c0352e736','Lion\'s Mane Mushroom Tincture',1000.00,5,'Give your brain a boost with our Lion\'s Mane Mushroom Tincture. In Chinese folklore, Lion’s Mane mushrooms promote “nerves of steel and the memory of a lion.”','236d0f77-de2f-420b-ae9e-cc8c94ae524f','44603db9-8050-404b-a210-d15749b904e5','948a1a61-00ef-4382-bf46-1119acf376f8','2025-04-15 01:32:37','2025-04-17 13:04:10'),
('b31cdc4d-50d8-45cd-be0e-c170ef40853f','5 Mushroom Powder',10000.00,5,'Our 5 Mushroom Powder provides the combined benefits of the world\'s top 5 mushrooms. Cultivate whole-body harmony with this potent mushroom blend. ','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','40eee29e-1b5f-4d72-a39e-5a0b5923b11c','d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','2025-04-13 02:42:11','2025-04-26 01:41:29'),
('c80de0fe-653d-4445-9bdc-e692e521a151','Parasite Purge Tincture',1000.00,2,'Expel intestinal parasites, worms and fungal infections with our Parasite Purge tincture. ','a0ef4ff8-388e-4399-9433-5c304781d324','44603db9-8050-404b-a210-d15749b904e5','9953edaa-45c1-4515-bfe1-d0f7fe64ba06','2025-04-14 16:59:28','2025-05-01 03:11:27'),
('fb29babb-9948-46ec-84a8-15ffd416a4d2','5 Mushroom Powder',10000.00,2,'Our 5 Mushroom Powder provides the combined benefits of the world\'s top 5 mushrooms. Cultivate whole-body harmony with this potent mushroom blend. ','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','40eee29e-1b5f-4d72-a39e-5a0b5923b11c','d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','2025-04-13 02:46:49','2025-04-26 12:11:34');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productTabs`
--

DROP TABLE IF EXISTS `productTabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productTabs` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productTabs`
--

LOCK TABLES `productTabs` WRITE;
/*!40000 ALTER TABLE `productTabs` DISABLE KEYS */;
INSERT INTO `productTabs` VALUES
('0748659a-e865-4d08-8573-982c31639744','c80de0fe-653d-4445-9bdc-e692e521a151','Ingredients','Medicinal Ingredients (per dose unit): *Garlic (Allium sativum, bulb)...0.15mL (1:4, QCE 37.5mg), *Black Walnut (Juglans nigra, unripe hull)...0.25mL (1:4, QCE 62.5mg), *Wormwood (Arthemisia absinthium, leaf)...0.25mL (1:5, QCE 50mg),  *Cinnamon (Cinnamomum aromaticum, branch bark)...0.15mL (1:4, QCE 37.5mg), *Thyme (Thymus vulgaris, leaf)...0.15mL (1:6, QCE 25mg), and *Clove (Syzygium aromaticum, clove)....0.05mL (1:4, QCE 12.5mg). \nNon-Medicinal Ingredients: Pure Spring Water, *Cane Alcohol. \n*Organic ','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('16e2d1b6-fdd6-44e5-8364-6ebff08d1c9a','1347f7ec-a0e1-4738-8ecc-b54905fced3e','Ingredients','*Lion\'s Mane (Hericium erinaceus), *Vegetable Glycerin, Purified Water, Acid Citric.\n*Certified Organic.\n','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2473d6c7-cde1-4aed-a214-1fc8e0bb3b96','1347f7ec-a0e1-4738-8ecc-b54905fced3e','References ','1 Kevin Spelman, PhD, MCPP Journal Compilation 2017, AARM DOI 10.14200/jrm.2017.6.0108 \n2 ​​Asim Shah Bacha, Syed & Ali, Shujaat & Ye, Li & Rehman, Hamid & Farooq, Saqib & Mushtaq, Aamar & Wahocho, Safdar. (2018). Lion\'s mane mushroom; new addition to food and natural bounty for human wellness: A review. 10.12692/ijb/13.4.396-402. \n3 Ghosh, Sandipta & Nandi, Sudeshna & Banerjee, Anuron & Sarkar, Swagata & Chakraborty, Nilanjan & Acharya, Krishnendu. (2021). Prospecting medicinal properties of Lion\'s mane mushroom. Journal of Food Biochemistry. 45. 13833. 10.1111/jfbc.13833. \n4 https://draxe.com/nutrition/lions-mane-mushroom/\n5 https://www.herbrally.com/monographs/lions-mane','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('796bee65-cf84-4654-b602-06dcfdd23f84','b31cdc4d-50d8-45cd-be0e-c170ef40853f','ingredients','Chaga, Cordyceps, Lion’s Mane, Reishi and Turkey Tail. ','2025-04-13 02:42:11','2025-04-13 02:42:11'),
('8306455a-7305-4d1e-8d78-95c168043dc6','c80de0fe-653d-4445-9bdc-e692e521a151','Description','Our therapeutic Tincture Blends are handcrafted on Vancouver Island and packed with high-quality, potent ingredients. Distilled in organic cane alcohol, these bioavailable formulas provide support for immunity to stress relief, and everything in between. Our 50ml and 100ml bottles come with a dropper top for easy dosing, while our 500ml bottles feature a screw cap for larger quantities.','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('96d0feb1-4c26-4e1c-b68b-1702d3a0fcdf','3538f758-77d4-40cc-97a6-703c0352e736','Recommended Use','NPN#: 80125205\n\nRecommended Use: Source of fungal polysaccharides with immunomodulating properties.','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('9a424f6c-ea9d-4c9f-a0df-db72159711ac','3538f758-77d4-40cc-97a6-703c0352e736','Description','\nFeaturing 100% fruiting body, our Lion\'s Mane Mushroom Tinctures are formulated by Clinical Herbalists and hand-crafted on Vancouver Island to create highly bioavailable medicine. Our 50ml and 100ml bottles come with a dropper top for easy dosing, while our 500ml bottles feature a screw cap for larger quantities.\n\nCurious to learn more about our functional mushrooms? Click Here','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('e45b94b7-559c-4146-bd26-c6a6a50b34b2','fb29babb-9948-46ec-84a8-15ffd416a4d2','ingredients','Chaga, Cordyceps, Lion’s Mane, Reishi and Turkey Tail. ','2025-04-13 02:46:49','2025-04-13 02:46:49'),
('ecbc8097-b55f-4909-93b1-8a55932603c4','3538f758-77d4-40cc-97a6-703c0352e736','Ingredients','Medicinal Ingredients: *Lion\'s Mane (Hericium erinaceus, Fruiting body)...0.7 mL (2:1, 1400 mg dry). \n\nPolysaccharides >30% \n\nNon-medicinal Ingredients: *Cane Alcohol, Pure Spring Water. \n\n*Organic ','2025-04-15 01:32:37','2025-04-15 01:32:37');
/*!40000 ALTER TABLE `productTabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productTypes`
--

DROP TABLE IF EXISTS `productTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productTypes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productTypes`
--

LOCK TABLES `productTypes` WRITE;
/*!40000 ALTER TABLE `productTypes` DISABLE KEYS */;
INSERT INTO `productTypes` VALUES
('236d0f77-de2f-420b-ae9e-cc8c94ae524f','Mushroom','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','Water','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('a0ef4ff8-388e-4399-9433-5c304781d324','Herbal','2025-04-14 16:59:28','2025-04-14 16:59:28');
/*!40000 ALTER TABLE `productTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_stock`
--

DROP TABLE IF EXISTS `size_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_stock` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `size` varchar(255) NOT NULL,
  `stock` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `size_stock_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_stock`
--

LOCK TABLES `size_stock` WRITE;
/*!40000 ALTER TABLE `size_stock` DISABLE KEYS */;
INSERT INTO `size_stock` VALUES
('0b50dc32-d5d7-4e8c-9189-54ff33d5ffc8','c80de0fe-653d-4445-9bdc-e692e521a151','100ml',1000.00,'2025-04-14 16:59:28','2025-04-14 16:59:28',2000.00),
('490547c4-f6ad-4f67-a88d-ead462884cf9','3538f758-77d4-40cc-97a6-703c0352e736','50ml',90.00,'2025-04-15 01:32:37','2025-04-17 01:35:43',1000.00),
('9b745f9b-85bd-4b6c-bd69-c5ec3c8c03f2','1347f7ec-a0e1-4738-8ecc-b54905fced3e','30ml',100.00,'2025-05-01 08:29:51','2025-05-01 08:29:51',370000.00),
('9b745f9b-85bd-4b6c-bd69-c5ec3c8c03fa','1347f7ec-a0e1-4738-8ecc-b54905fced3e','50ml',100.00,'2025-05-01 08:29:51','2025-05-01 08:29:51',590000.00),
('b1c4daad-f9bd-4d07-8260-74d22831aa82','262399e3-a04f-4181-8c85-7d90888053eb','L',23.00,'2025-04-13 05:14:52','2025-04-13 05:14:52',10000.00),
('b5086461-948f-4c74-a436-a7fae00648bc','3538f758-77d4-40cc-97a6-703c0352e736','100ml',578.00,'2025-04-15 01:32:37','2025-04-17 01:27:40',2000.00),
('e4d37a5c-3258-4dcb-9893-347bb7502ad6','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',21.00,'2025-04-14 16:59:28','2025-04-17 01:27:40',1000.00),
('fa7fdeec-48f0-492b-805c-a85628114b8c','fb29babb-9948-46ec-84a8-15ffd416a4d2','L',25.00,'2025-04-13 02:46:49','2025-04-13 02:46:49',10000.00);
/*!40000 ALTER TABLE `size_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` varchar(255) NOT NULL,
  `discount` float NOT NULL,
  `type` enum('percent','amount') DEFAULT 'percent',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES
('VOUCHER_20250430_13000AMOUNT',13000,'amount','2025-04-30 02:00:21','2025-04-30 02:00:21'),
('VOUCHER_20250430_80PERCENT',0.8,'percent','2025-04-30 01:59:12','2025-04-30 01:59:12');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wellnessNeeds`
--

DROP TABLE IF EXISTS `wellnessNeeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wellnessNeeds` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wellnessNeeds`
--

LOCK TABLES `wellnessNeeds` WRITE;
/*!40000 ALTER TABLE `wellnessNeeds` DISABLE KEYS */;
INSERT INTO `wellnessNeeds` VALUES
('948a1a61-00ef-4382-bf46-1119acf376f8','Other','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('9953edaa-45c1-4515-bfe1-d0f7fe64ba06','Herb','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','OK','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('f3994323-a03b-4b7b-9b9f-a856f9036357','KOOOOOOO','2025-04-13 05:14:52','2025-04-13 05:14:52');
/*!40000 ALTER TABLE `wellnessNeeds` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Dump completed on 2025-05-01 17:25:14
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `country` varchar(100) NOT NULL,
  `apartment` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `zipCode` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES
('70c04214-655e-4973-b345-165e8198f764','5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa','Le','41c, ap My Thanh, xa My Phong','VN','','My Tho','Hồ Chí Minh','2600','2025-04-21 07:04:24','2025-04-21 07:04:24'),
('75b4a127-3d5c-4d26-ba26-b77dbf8ed848','5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa ','Le','kkktest address','VN','kkk','My Tho','Hà Nội','1','2025-04-21 08:05:12','2025-04-21 08:05:12');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `mail_2` (`mail`),
  UNIQUE KEY `mail_3` (`mail`),
  UNIQUE KEY `mail_4` (`mail`),
  UNIQUE KEY `mail_5` (`mail`),
  UNIQUE KEY `mail_6` (`mail`),
  UNIQUE KEY `mail_7` (`mail`),
  UNIQUE KEY `mail_8` (`mail`),
  UNIQUE KEY `mail_9` (`mail`),
  UNIQUE KEY `mail_10` (`mail`),
  UNIQUE KEY `mail_11` (`mail`),
  UNIQUE KEY `mail_12` (`mail`),
  UNIQUE KEY `mail_13` (`mail`),
  UNIQUE KEY `mail_14` (`mail`),
  UNIQUE KEY `mail_15` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES
('e19b57bd-33d1-4fbd-a6ac-25611f48fe04','Khoa Admin','lekhoaadmin@gmail.com','12345678','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articleCategories`
--

DROP TABLE IF EXISTS `articleCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articleCategories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articleCategories`
--

LOCK TABLES `articleCategories` WRITE;
/*!40000 ALTER TABLE `articleCategories` DISABLE KEYS */;
INSERT INTO `articleCategories` VALUES
('70c8b82d-54f7-48f8-9e67-886669c3a6d6','kkkkkkkkk','2025-04-14 05:08:27','2025-04-14 05:08:27'),
('a49d2a1a-395d-499e-aad2-391609534c2e','Cleansing','2025-04-14 06:06:27','2025-04-14 06:06:27'),
('e19b57bd-33d1-4fbd-a6ac-25611f48fe02','noCate','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `articleCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `adminId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `shortDescription` text,
  `categoryId` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adminId` (`adminId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES
('0627f9a7-deed-4e75-baf9-6b9e0200e033','1','<p>3</p><p><img src=\"http://localhost:3000/uploads/1744602914231-07r1teaox4e.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 03:55:14','2025-04-14 03:55:14','http://localhost:3000/uploads/1744602914244-457j7984dvb.jpeg','2','e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('1c22f515-2d69-42b5-a851-4e4916ba4303','title','<p>123</p><p><img src=\"http://localhost:3000/uploads/1744509891321-mv4ox5mzv8j.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-13 02:04:51','2025-04-13 02:04:51','http://localhost:3000/uloads/1744509891364-j0m8e6498gg.jpg','short','e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('3339462b-a04b-4b8e-9525-9405aa9464f6','test','<p>1<img src=\"http://localhost:3000/uploads/1744468472200-b0iztfbv3sg.png\">2<img src=\"http://localhost:3000/uploads/1744468472214-q2ema479xw8.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-12 14:43:45','2025-04-12 14:43:45',NULL,NULL,'e19b57bd-33d1-4fbd-a6ac-25611f48fe02'),
('8c49f5fb-0498-40a2-8913-fb07a7e5ba26','Revive & Thrive: The Benefits of Cleansing','<p>Spring is the perfect time to \'tune-up\' the body\'s internal filtration system and clear out toxins after a long winter. Despite having its own innate detoxification channels, cleansing herbs can support the body in this process, promoting overall vitality and well-being.</p><p><strong>Disclaimer: </strong>This blog is for educational purposes only and is not a substitute for medical advice. Please consult your health care practitioner before adding any new herbs to your wellness routine or embarking on a seasonal cleanse.</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 06:06:27','2025-04-14 06:06:27','http://localhost:3000/uploads/1744610786578-qkxnh24gokb.webp','Spring is the perfect time to \'tune-up\' the body\'s internal filtration system and clear out toxins after a long winter. Despite having its own innate detoxification channels, cleansing herbs can support the body in this process, promoting overall vitality and well-being.','a49d2a1a-395d-499e-aad2-391609534c2e'),
('96e2b72d-a41e-4544-9aa6-35f47f13c267','Antioxidant-Rich Products for Healthy Aging','<p>The global population of seniors (those age 60-65) is expected to double by the year 2050, with many people looking for ways to turn back the clock. Recent research has shown remarkable progress on reversing biological aging, and maintaining cellular wellness by prioritizing antioxidant intake is a great place to start.</p><p><strong>Disclaimer:</strong> This blog is for educational purposes only and is not a substitute for medical advice. Please consult your health care practitioner before adding any new herbs to your wellness routine.</p><h3>The Dangers of Free Radicals</h3><p>Free radicals are unstable atoms that can damage cells. They can be generated by exposure to electromagnetic fields (predominantly due to electronic use), ultraviolet light, stress, smoke, alcohol, and several other factors. Over time, free radical buildup can cause enough damage to result in illness and aging.</p><p>One of the best ways to prevent this is by increasing antioxidant intake. Antioxidants are a type of molecule that combat free radical damage by preventing their formation, scavenging them, or supporting their decomposition (1).</p><h3>The Role of Ergothioneine</h3><p>Ergothioneine (ET) is a naturally occurring amino acid and a potent antioxidant, known for its ability to combat free radical damage. Often identified as a dietary supplement, or as an anti-aging ingredient in personal care products, ET can be found in fermented foods, culinary mushrooms, and medicinal mushrooms.</p><p>Studies have shown that this amino acid is able to improve vascularity, muscle mass, and muscle stem cell content – enhancing endurance as a result. This study also noted that ET stimulated an increase in NAD+, a vital coenzyme that supports energy metabolism, DNA repair, and cellular signaling. This suggests that ET can have a rejuvenating effect, preserving cellular function (2).</p><h3>Antioxidant-Rich Products for Healthy Aging</h3><h4>5 Mushroom Blend</h4><p>We’ve combined the power of the world’s top 5 function mushrooms to create our 5 Mushroom Blend. Chaga, cordyceps, lion’s mane, reishi, and turkey tail provide a rich source of antioxidants – including ergothioneine – among other potent benefits. When used synergistically, these mushrooms promote balance in the body by supporting immunity, energy, cognitive function, stress resilience, and digestion (3, 4, 5). Learn more about functional mushrooms <strong><a href=\"https://harmonicarts.ca/blogs/mushrooms-101\" rel=\"noopener noreferrer\" target=\"_blank\">here</a></strong>.</p><h4>Shilajit</h4><p>Shilajit’s rich fulvic acid content makes it a powerhouse at combating oxidative damage – even rivalling the antioxidant levels found in blueberries. This also makes Shilajit a complement activator, stimulating the production of antibodies to dispose of damaged cells within the body (6). By preventing and combating free radical damage, Shilajit can delay visible signs of aging.</p><h4>Liver TLC Herbal Tincture Blend</h4><p>Liver TLC is packed with liver-protective herbs that promote gentle cleansing and detoxification. Dandelion is a bitter herb that stimulates liver function, combats free-radicals, and prevents fibrosis of the liver from taking form (7). Milk thistle contains an active compound called silymarin that is packed with antioxidants. It also works to soothe liver inflammation (8).</p><h4>Bio-Shield Herbal Tincture Blend</h4><p>Bio-Shield is intentionally formulated with antioxidant-rich herbs that can support detoxification and immune function. Bladderwrack has been shown to have the highest free radical scavenging activity, along with the highest antioxidant capacity, compared to other seaweeds (9). Burdock can detoxify the liver against a variety of harmful chemicals and heavy metals by stimulating liver enzyme function. It’s packed with antioxidants, prebiotics, and anti-inflammatory compounds (10). Learn more about preventing free radical damage with this formula <strong><a href=\"https://harmonicarts.ca/blogs/nourish-with-nature/preventing-free-radical-damage-with-bio-shield\" rel=\"noopener noreferrer\" target=\"_blank\">here</a></strong>.</p><h4>Elderberry Syrup</h4><p>Elderberries are packed with antioxidant, anti-inflammatory, antimicrobial, and neuroprotective properties, along with high levels of vitamin C (11). As a result, this potent herb can shorten the duration of cold and flu symptoms while modulating the immune system and combatting free radical damage.</p><p><strong><a href=\"https://harmonicarts.ca/collections/antioxidant-rich\" rel=\"noopener noreferrer\" target=\"_blank\">Click here</a></strong> to explore more antioxidant-rich products.</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 06:30:50','2025-04-14 06:30:50','http://localhost:3000/uploads/1744612250171-45p349kzsrc.webp','The global population of seniors (those age 60-65) is expected to double by the year 2050, with many people looking for ways to turn back the clock. Recent research has shown remarkable progress on reversing biological aging, and maintaining cellular wellness by prioritizing antioxidant intake is a great place to start.','a49d2a1a-395d-499e-aad2-391609534c2e'),
('9ce899ce-cb53-4b6d-b246-c53fd5c7e16f','123','<p>123</p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 05:08:27','2025-04-14 05:08:27','http://localhost:3000/uploads/1744607307333-50ch1x9nf5e.jpg','321','70c8b82d-54f7-48f8-9e67-886669c3a6d6'),
('bef24178-cdf0-4614-ad61-84e506b86e41','t','<p><img src=\"http://localhost:3000/uploads/1744602675716-4bla3vd74hm.png\"></p>','e19b57bd-33d1-4fbd-a6ac-25611f48fe04','2025-04-14 03:51:16','2025-04-14 03:51:16','http://localhost:3000/uploads/1744602675726-s7edhlwm1wd.jpg','123','e19b57bd-33d1-4fbd-a6ac-25611f48fe02');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES
('5da6594c-1057-42e0-b7b6-cc2c224f1abb','2025-04-13 05:14:52','2025-04-13 05:14:52','5da6594c-1057-42e0-b7b6-cc2c224f1abf');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `num` int NOT NULL,
  `size` varchar(20) NOT NULL,
  `cartId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cartId` (`cartId`),
  KEY `productId` (`productId`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES
('646b18c7-4f31-4aa5-8f9a-5e439fcb03ee',7,'100ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','3538f758-77d4-40cc-97a6-703c0352e736','2025-04-26 01:42:54','2025-04-26 01:42:54'),
('6a5381cf-87e0-4dcc-892c-3665abbe8e6f',2,'L','5da6594c-1057-42e0-b7b6-cc2c224f1abb','262399e3-a04f-4181-8c85-7d90888053eb','2025-04-26 15:51:03','2025-04-26 15:51:03'),
('9809313c-e267-42fb-9e38-e9a424e18d8a',16,'50ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','3538f758-77d4-40cc-97a6-703c0352e736','2025-04-17 06:53:21','2025-04-26 01:42:49'),
('c106b890-e6e5-4d7e-aa10-1b2321475d19',3,'100ml','5da6594c-1057-42e0-b7b6-cc2c224f1abb','c80de0fe-653d-4445-9bdc-e692e521a151','2025-04-26 15:51:17','2025-04-26 15:51:17');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `comments_ibfk_67` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
('0505e4df-2304-4ea1-9ec8-32aad3d66d4f','Cái gì lạ v\n','b31cdc4d-50d8-45cd-be0e-c170ef40853f','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-26 01:41:29','2025-04-26 01:41:29',5),
('2452e5b4-9925-4265-8e92-546d3b230d34','Đỉnhhhhh','3538f758-77d4-40cc-97a6-703c0352e736','','2025-04-17 13:04:10','2025-04-17 13:04:10',5),
('2452e5b4-9925-4265-8e92-546d3b230d3a','kkk','fb29babb-9948-46ec-84a8-15ffd416a4d2','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-26 12:11:34','2025-04-26 12:11:34',2),
('bfc5ac60-ca9d-4934-8a8a-df32a4b6a31e','Đỉnhhhhh','3538f758-77d4-40cc-97a6-703c0352e736','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-04-17 13:04:10','2025-04-17 13:04:10',5),
('eb5bea5b-3d7b-473f-94cd-1ea48bc1e115','hêh','c80de0fe-653d-4445-9bdc-e692e521a151','5da6594c-1057-42e0-b7b6-cc2c224f1abf','2025-05-01 03:11:27','2025-05-01 03:11:27',2);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(100) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `mail_2` (`mail`),
  UNIQUE KEY `mail_3` (`mail`),
  UNIQUE KEY `mail_4` (`mail`),
  UNIQUE KEY `mail_5` (`mail`),
  UNIQUE KEY `mail_6` (`mail`),
  UNIQUE KEY `mail_7` (`mail`),
  UNIQUE KEY `mail_8` (`mail`),
  UNIQUE KEY `mail_9` (`mail`),
  UNIQUE KEY `mail_10` (`mail`),
  UNIQUE KEY `mail_11` (`mail`),
  UNIQUE KEY `mail_12` (`mail`),
  UNIQUE KEY `mail_13` (`mail`),
  UNIQUE KEY `mail_14` (`mail`),
  UNIQUE KEY `mail_15` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES
('5da6594c-1057-42e0-b7b6-cc2c224f1ab4','Khoa cus2','khoacus2@gmail.com','12345678','0708103015','2062-08-01 22:46:13','2062-08-01 22:46:13'),
('5da6594c-1057-42e0-b7b6-cc2c224f1abf','Khoa cus','khoacus@gmail.com','12345678','0708103015','2062-08-01 22:46:13','2062-08-01 22:46:13');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `paymentMethod` text NOT NULL,
  `transactionId` text NOT NULL,
  `status` enum('pending','paid','failed') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `size` varchar(20) NOT NULL,
  `num` int NOT NULL,
  `price_at_order` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES
('0a3d7b93-38bc-409c-b05b-f1c6fd2b839c','0462b412-b53b-4bbd-8727-e90aa512396a','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',2,1000.00,'2025-04-17 01:27:40','2025-04-17 01:27:40'),
('37e8f233-562b-4425-bb69-5a51e491dc03','8d2c70d3-31b7-419c-a473-2a3d6f407de1','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',2,1000.00,'2025-04-17 01:23:32','2025-04-17 01:23:32'),
('93a7a0df-364c-41ad-ade5-eb9fef888cfa','0e61c8ae-f17d-4107-98a4-38d8613b251f','262399e3-a04f-4181-8c85-7d90888053eb','L',3,10000.00,'2025-04-16 10:20:38','2025-04-16 10:20:38'),
('a42d23ae-fbea-4c62-9166-270aa005c660','0462b412-b53b-4bbd-8727-e90aa512396a','3538f758-77d4-40cc-97a6-703c0352e736','100ml',2,1000.00,'2025-04-17 01:27:40','2025-04-17 01:27:40'),
('bdb3cab5-0328-4d46-812d-10ad6f24bc3c','0e61c8ae-f17d-4107-98a4-38d8613b251f','3538f758-77d4-40cc-97a6-703c0352e736','50ml',2,1000.00,'2025-04-16 10:20:38','2025-04-16 10:20:38'),
('daca830b-27bb-471a-b086-ca0a3fcd9ffb','8d2c70d3-31b7-419c-a473-2a3d6f407de1','3538f758-77d4-40cc-97a6-703c0352e736','100ml',2,1000.00,'2025-04-17 01:23:32','2025-04-17 01:23:32'),
('db33a1ca-20ac-470a-9b38-52aefdd882aa','bdef62e9-a686-4b54-8723-ade98f79c4c4','3538f758-77d4-40cc-97a6-703c0352e736','50ml',10,1000.00,'2025-04-17 01:35:43','2025-04-17 01:35:43');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `addressId` varchar(255) DEFAULT NULL,
  `trackingNumber` text,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
('0462b412-b53b-4bbd-8727-e90aa512396a','5da6594c-1057-42e0-b7b6-cc2c224f1abf',34000.00,'pending','2025-04-17 01:27:40','2025-04-17 01:27:40',NULL,NULL),
('0e61c8ae-f17d-4107-98a4-38d8613b251f','5da6594c-1057-42e0-b7b6-cc2c224f1abf',62000.00,'pending','2025-04-16 10:20:38','2025-04-16 10:20:38',NULL,NULL),
('8d2c70d3-31b7-419c-a473-2a3d6f407de1','5da6594c-1057-42e0-b7b6-cc2c224f1abf',34000.00,'pending','2025-04-17 01:23:32','2025-04-17 01:23:32',NULL,NULL),
('bdef62e9-a686-4b54-8723-ade98f79c4c4','5da6594c-1057-42e0-b7b6-cc2c224f1abf',40000.00,'pending','2025-04-17 01:35:42','2025-04-17 01:35:42',NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productForms`
--

DROP TABLE IF EXISTS `productForms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productForms` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productForms`
--

LOCK TABLES `productForms` WRITE;
/*!40000 ALTER TABLE `productForms` DISABLE KEYS */;
INSERT INTO `productForms` VALUES
('27071ed5-44c9-46f3-89e8-28d704b3bf58','Apple','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('40eee29e-1b5f-4d72-a39e-5a0b5923b11c','Banana','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('44603db9-8050-404b-a210-d15749b904e5','Tincture','2025-04-14 16:59:28','2025-04-14 16:59:28');
/*!40000 ALTER TABLE `productForms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productImages`
--

DROP TABLE IF EXISTS `productImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productImages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `url` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productImages`
--

LOCK TABLES `productImages` WRITE;
/*!40000 ALTER TABLE `productImages` DISABLE KEYS */;
INSERT INTO `productImages` VALUES
('0228e019-394b-40bd-b9d7-c6758b63364b','3538f758-77d4-40cc-97a6-703c0352e736','http://localhost:3000/uploads/1744680756393-l5j2futtq3d.webp','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('19b1fcba-50ac-4523-8086-db4f767b58e3','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190169-0irfegw8rkto.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2b00ea0d-e89c-43c0-87fa-dedbd18bdf7e','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190152-ebx14y9flfi.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2cb28b43-1298-40cf-bbba-b185fcea9ea6','b31cdc4d-50d8-45cd-be0e-c170ef40853f','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 02:42:11','2025-04-13 02:42:11'),
('3fe556a1-2b8a-4503-b2af-ce79cb6016db','c80de0fe-653d-4445-9bdc-e692e521a151','http://localhost:3000/uploads/1744649898764-4mm4ybwfhau.webp','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('410420ef-5c34-4002-9fd2-2cf4cad3366e','c80de0fe-653d-4445-9bdc-e692e521a151','http://localhost:3000/uploads/1744649898802-xvk8jv97rr9.webp','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('52ec694b-5601-4d1e-bbcf-2e44b142ba41','262399e3-a04f-4181-8c85-7d90888053eb','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('8b2d5e39-1eb1-4248-9a1a-97a801225966','fb29babb-9948-46ec-84a8-15ffd416a4d2','http://localhost:3000/uploads/1744521291603-9xh3qz5w11r.webp','2025-04-13 02:46:49','2025-04-13 02:46:49'),
('9fcb805f-5b85-442d-b1bb-11a549283809','262399e3-a04f-4181-8c85-7d90888053eb','http://localhost:3000/uploads/1744521291595-olsvg09rgp.webp','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('dda87c7a-399b-4bc6-89fb-cf419418413c','3538f758-77d4-40cc-97a6-703c0352e736','http://localhost:3000/uploads/1744680756378-iwhpjnd5v5.webp','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('f9d144e1-6bce-4eec-8bde-415830474ba3','1347f7ec-a0e1-4738-8ecc-b54905fced3e','http://localhost:3000/uploads/1746088190142-ioqvy8txigp.jpeg','2025-05-01 08:29:51','2025-05-01 08:29:51');
/*!40000 ALTER TABLE `productImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `rate` float NOT NULL DEFAULT '0',
  `content` text,
  `typeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `formId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `needId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
('1347f7ec-a0e1-4738-8ecc-b54905fced3e','Lion\'s Mane Spagyric Tincture',10000.00,0,'Lion’s Mane (Hericium erinaceus) is carefully selected and cultivated from clean, trusted sources, grown under natural conditions with proper technical standards. The extraction process is done by hand, with meticulous attention at every step, honoring the original integrity and natural essence of the mushroom. \nFor centuries, Lion’s Mane has been regarded as a gift from nature, often mentioned in Eastern traditions as a companion to inner clarity and mental presence. Many incorporate it into their daily routines as a way to stay centered, support focus during work, and reconnect with a sense of calm from within. \nOur extract is crafted using the spagyric method — an ancient alchemical approach that combines herbal knowledge with philosophical depth. This process yields a full-spectrum essence, preserving the natural complexity of the mushroom. It is a meaningful choice for those seeking a deeper connection with themselves and a sense of balance amidst the movement of modern life.','236d0f77-de2f-420b-ae9e-cc8c94ae524f','44603db9-8050-404b-a210-d15749b904e5','948a1a61-00ef-4382-bf46-1119acf376f8','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('262399e3-a04f-4181-8c85-7d90888053eb','kkk',10000.00,0,'213','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','27071ed5-44c9-46f3-89e8-28d704b3bf58','f3994323-a03b-4b7b-9b9f-a856f9036357','2025-04-13 05:14:52','2025-04-13 05:14:52'),
('3538f758-77d4-40cc-97a6-703c0352e736','Lion\'s Mane Mushroom Tincture',1000.00,5,'Give your brain a boost with our Lion\'s Mane Mushroom Tincture. In Chinese folklore, Lion’s Mane mushrooms promote “nerves of steel and the memory of a lion.”','236d0f77-de2f-420b-ae9e-cc8c94ae524f','44603db9-8050-404b-a210-d15749b904e5','948a1a61-00ef-4382-bf46-1119acf376f8','2025-04-15 01:32:37','2025-04-17 13:04:10'),
('b31cdc4d-50d8-45cd-be0e-c170ef40853f','5 Mushroom Powder',10000.00,5,'Our 5 Mushroom Powder provides the combined benefits of the world\'s top 5 mushrooms. Cultivate whole-body harmony with this potent mushroom blend. ','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','40eee29e-1b5f-4d72-a39e-5a0b5923b11c','d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','2025-04-13 02:42:11','2025-04-26 01:41:29'),
('c80de0fe-653d-4445-9bdc-e692e521a151','Parasite Purge Tincture',1000.00,2,'Expel intestinal parasites, worms and fungal infections with our Parasite Purge tincture. ','a0ef4ff8-388e-4399-9433-5c304781d324','44603db9-8050-404b-a210-d15749b904e5','9953edaa-45c1-4515-bfe1-d0f7fe64ba06','2025-04-14 16:59:28','2025-05-01 03:11:27'),
('fb29babb-9948-46ec-84a8-15ffd416a4d2','5 Mushroom Powder',10000.00,2,'Our 5 Mushroom Powder provides the combined benefits of the world\'s top 5 mushrooms. Cultivate whole-body harmony with this potent mushroom blend. ','7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','40eee29e-1b5f-4d72-a39e-5a0b5923b11c','d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','2025-04-13 02:46:49','2025-04-26 12:11:34');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productTabs`
--

DROP TABLE IF EXISTS `productTabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productTabs` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productTabs`
--

LOCK TABLES `productTabs` WRITE;
/*!40000 ALTER TABLE `productTabs` DISABLE KEYS */;
INSERT INTO `productTabs` VALUES
('0748659a-e865-4d08-8573-982c31639744','c80de0fe-653d-4445-9bdc-e692e521a151','Ingredients','Medicinal Ingredients (per dose unit): *Garlic (Allium sativum, bulb)...0.15mL (1:4, QCE 37.5mg), *Black Walnut (Juglans nigra, unripe hull)...0.25mL (1:4, QCE 62.5mg), *Wormwood (Arthemisia absinthium, leaf)...0.25mL (1:5, QCE 50mg),  *Cinnamon (Cinnamomum aromaticum, branch bark)...0.15mL (1:4, QCE 37.5mg), *Thyme (Thymus vulgaris, leaf)...0.15mL (1:6, QCE 25mg), and *Clove (Syzygium aromaticum, clove)....0.05mL (1:4, QCE 12.5mg). \nNon-Medicinal Ingredients: Pure Spring Water, *Cane Alcohol. \n*Organic ','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('16e2d1b6-fdd6-44e5-8364-6ebff08d1c9a','1347f7ec-a0e1-4738-8ecc-b54905fced3e','Ingredients','*Lion\'s Mane (Hericium erinaceus), *Vegetable Glycerin, Purified Water, Acid Citric.\n*Certified Organic.\n','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('2473d6c7-cde1-4aed-a214-1fc8e0bb3b96','1347f7ec-a0e1-4738-8ecc-b54905fced3e','References ','1 Kevin Spelman, PhD, MCPP Journal Compilation 2017, AARM DOI 10.14200/jrm.2017.6.0108 \n2 ​​Asim Shah Bacha, Syed & Ali, Shujaat & Ye, Li & Rehman, Hamid & Farooq, Saqib & Mushtaq, Aamar & Wahocho, Safdar. (2018). Lion\'s mane mushroom; new addition to food and natural bounty for human wellness: A review. 10.12692/ijb/13.4.396-402. \n3 Ghosh, Sandipta & Nandi, Sudeshna & Banerjee, Anuron & Sarkar, Swagata & Chakraborty, Nilanjan & Acharya, Krishnendu. (2021). Prospecting medicinal properties of Lion\'s mane mushroom. Journal of Food Biochemistry. 45. 13833. 10.1111/jfbc.13833. \n4 https://draxe.com/nutrition/lions-mane-mushroom/\n5 https://www.herbrally.com/monographs/lions-mane','2025-05-01 08:29:51','2025-05-01 08:29:51'),
('796bee65-cf84-4654-b602-06dcfdd23f84','b31cdc4d-50d8-45cd-be0e-c170ef40853f','ingredients','Chaga, Cordyceps, Lion’s Mane, Reishi and Turkey Tail. ','2025-04-13 02:42:11','2025-04-13 02:42:11'),
('8306455a-7305-4d1e-8d78-95c168043dc6','c80de0fe-653d-4445-9bdc-e692e521a151','Description','Our therapeutic Tincture Blends are handcrafted on Vancouver Island and packed with high-quality, potent ingredients. Distilled in organic cane alcohol, these bioavailable formulas provide support for immunity to stress relief, and everything in between. Our 50ml and 100ml bottles come with a dropper top for easy dosing, while our 500ml bottles feature a screw cap for larger quantities.','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('96d0feb1-4c26-4e1c-b68b-1702d3a0fcdf','3538f758-77d4-40cc-97a6-703c0352e736','Recommended Use','NPN#: 80125205\n\nRecommended Use: Source of fungal polysaccharides with immunomodulating properties.','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('9a424f6c-ea9d-4c9f-a0df-db72159711ac','3538f758-77d4-40cc-97a6-703c0352e736','Description','\nFeaturing 100% fruiting body, our Lion\'s Mane Mushroom Tinctures are formulated by Clinical Herbalists and hand-crafted on Vancouver Island to create highly bioavailable medicine. Our 50ml and 100ml bottles come with a dropper top for easy dosing, while our 500ml bottles feature a screw cap for larger quantities.\n\nCurious to learn more about our functional mushrooms? Click Here','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('e45b94b7-559c-4146-bd26-c6a6a50b34b2','fb29babb-9948-46ec-84a8-15ffd416a4d2','ingredients','Chaga, Cordyceps, Lion’s Mane, Reishi and Turkey Tail. ','2025-04-13 02:46:49','2025-04-13 02:46:49'),
('ecbc8097-b55f-4909-93b1-8a55932603c4','3538f758-77d4-40cc-97a6-703c0352e736','Ingredients','Medicinal Ingredients: *Lion\'s Mane (Hericium erinaceus, Fruiting body)...0.7 mL (2:1, 1400 mg dry). \n\nPolysaccharides >30% \n\nNon-medicinal Ingredients: *Cane Alcohol, Pure Spring Water. \n\n*Organic ','2025-04-15 01:32:37','2025-04-15 01:32:37');
/*!40000 ALTER TABLE `productTabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productTypes`
--

DROP TABLE IF EXISTS `productTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `productTypes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productTypes`
--

LOCK TABLES `productTypes` WRITE;
/*!40000 ALTER TABLE `productTypes` DISABLE KEYS */;
INSERT INTO `productTypes` VALUES
('236d0f77-de2f-420b-ae9e-cc8c94ae524f','Mushroom','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('7f738331-f2f0-4bc2-aca4-0b6a81b6b6c1','Water','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('a0ef4ff8-388e-4399-9433-5c304781d324','Herbal','2025-04-14 16:59:28','2025-04-14 16:59:28');
/*!40000 ALTER TABLE `productTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_stock`
--

DROP TABLE IF EXISTS `size_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_stock` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `size` varchar(255) NOT NULL,
  `stock` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `size_stock_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_stock`
--

LOCK TABLES `size_stock` WRITE;
/*!40000 ALTER TABLE `size_stock` DISABLE KEYS */;
INSERT INTO `size_stock` VALUES
('0b50dc32-d5d7-4e8c-9189-54ff33d5ffc8','c80de0fe-653d-4445-9bdc-e692e521a151','100ml',1000.00,'2025-04-14 16:59:28','2025-04-14 16:59:28',2000.00),
('490547c4-f6ad-4f67-a88d-ead462884cf9','3538f758-77d4-40cc-97a6-703c0352e736','50ml',90.00,'2025-04-15 01:32:37','2025-04-17 01:35:43',1000.00),
('9b745f9b-85bd-4b6c-bd69-c5ec3c8c03f2','1347f7ec-a0e1-4738-8ecc-b54905fced3e','30ml',100.00,'2025-05-01 08:29:51','2025-05-01 08:29:51',370000.00),
('9b745f9b-85bd-4b6c-bd69-c5ec3c8c03fa','1347f7ec-a0e1-4738-8ecc-b54905fced3e','50ml',100.00,'2025-05-01 08:29:51','2025-05-01 08:29:51',590000.00),
('b1c4daad-f9bd-4d07-8260-74d22831aa82','262399e3-a04f-4181-8c85-7d90888053eb','L',23.00,'2025-04-13 05:14:52','2025-04-13 05:14:52',10000.00),
('b5086461-948f-4c74-a436-a7fae00648bc','3538f758-77d4-40cc-97a6-703c0352e736','100ml',578.00,'2025-04-15 01:32:37','2025-04-17 01:27:40',2000.00),
('e4d37a5c-3258-4dcb-9893-347bb7502ad6','c80de0fe-653d-4445-9bdc-e692e521a151','50ml',21.00,'2025-04-14 16:59:28','2025-04-17 01:27:40',1000.00),
('fa7fdeec-48f0-492b-805c-a85628114b8c','fb29babb-9948-46ec-84a8-15ffd416a4d2','L',25.00,'2025-04-13 02:46:49','2025-04-13 02:46:49',10000.00);
/*!40000 ALTER TABLE `size_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `id` varchar(255) NOT NULL,
  `discount` float NOT NULL,
  `type` enum('percent','amount') DEFAULT 'percent',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES
('VOUCHER_20250430_13000AMOUNT',13000,'amount','2025-04-30 02:00:21','2025-04-30 02:00:21'),
('VOUCHER_20250430_80PERCENT',0.8,'percent','2025-04-30 01:59:12','2025-04-30 01:59:12');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wellnessNeeds`
--

DROP TABLE IF EXISTS `wellnessNeeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `wellnessNeeds` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wellnessNeeds`
--

LOCK TABLES `wellnessNeeds` WRITE;
/*!40000 ALTER TABLE `wellnessNeeds` DISABLE KEYS */;
INSERT INTO `wellnessNeeds` VALUES
('948a1a61-00ef-4382-bf46-1119acf376f8','Other','2025-04-15 01:32:37','2025-04-15 01:32:37'),
('9953edaa-45c1-4515-bfe1-d0f7fe64ba06','Herb','2025-04-14 16:59:28','2025-04-14 16:59:28'),
('d4721fea-e7c2-4921-b6a1-6ce9da0e5d57','OK','2025-04-13 02:32:48','2025-04-13 02:32:48'),
('f3994323-a03b-4b7b-9b9f-a856f9036357','KOOOOOOO','2025-04-13 05:14:52','2025-04-13 05:14:52');
/*!40000 ALTER TABLE `wellnessNeeds` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Dump completed on 2025-05-01 17:25:14

-- --------------------------------------------------------
-- Host:                         xxxx
-- Server version:               8.0.26-0ubuntu0.21.04.3 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for scumbot_development
CREATE DATABASE IF NOT EXISTS `scumbot_development` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scumbot_development`;

-- Dumping structure for table scumbot_development.announcements
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `publishedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dumping structure for table scumbot_development.bounties
CREATE TABLE IF NOT EXISTS `bounties` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `victimId` int DEFAULT NULL,
  `reward` int NOT NULL DEFAULT '0',
  `discordMessageId` varchar(255) DEFAULT NULL,
  `claimedById` int DEFAULT NULL,
  `killId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `victimSteamId64` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sentAt` datetime NOT NULL,
  `context` varchar(12) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `authorSteamId64` varchar(25) NOT NULL,
  `authorIgn` varchar(255) DEFAULT NULL,
  `authorScumId` varchar(25) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `publishedAt` datetime DEFAULT NULL,
  `mentionAdmins` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `idx_publishedAt` (`publishedAt`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18838 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.drones
CREATE TABLE IF NOT EXISTS `drones` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `lastSeenAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for event scumbot_development.event_server_restart_6pm
DELIMITER //
CREATE EVENT `event_server_restart_6pm` ON SCHEDULE EVERY 1 DAY STARTS '2021-09-08 07:45:00' ON COMPLETION PRESERVE ENABLE DO INSERT INTO announcements (content) VALUES ('The server will restart at 6PM AEST (in about 15 minutes)')//
DELIMITER ;

-- Dumping structure for event scumbot_development.event_server_restart_9am
DELIMITER //
CREATE EVENT `event_server_restart_9am` ON SCHEDULE EVERY 1 DAY STARTS '2021-09-07 22:45:00' ON COMPLETION PRESERVE ENABLE DO INSERT INTO announcements (content) VALUES ('The server will restart at 9AM AEST (in about 15 minutes)')//
DELIMITER ;

-- Dumping structure for table scumbot_development.kills
CREATE TABLE IF NOT EXISTS `kills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `killerName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `killerInEvent` tinyint(1) NOT NULL DEFAULT '0',
  `killerServerX` decimal(18,9) DEFAULT NULL,
  `killerServerY` decimal(18,9) DEFAULT NULL,
  `killerServerZ` decimal(18,9) DEFAULT NULL,
  `killerClientX` decimal(18,9) DEFAULT NULL,
  `killerClientY` decimal(18,9) DEFAULT NULL,
  `killerClientZ` decimal(18,9) DEFAULT NULL,
  `killerSteamId64` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `killerImmortal` tinyint(1) NOT NULL DEFAULT '0',
  `victimName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `victimInEvent` tinyint(1) NOT NULL DEFAULT '0',
  `victimServerX` decimal(18,9) DEFAULT NULL,
  `victimServerY` decimal(18,9) DEFAULT NULL,
  `victimServerZ` decimal(18,9) DEFAULT NULL,
  `victimClientX` decimal(18,9) DEFAULT NULL,
  `victimClientY` decimal(18,9) DEFAULT NULL,
  `victimClientZ` decimal(10,0) DEFAULT NULL,
  `victimSteamId64` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `weaponName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `weaponDamage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `timeOfDay` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `logTimestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `victimUserId` int DEFAULT NULL,
  `killerUserId` int DEFAULT NULL,
  `publishedAt` datetime DEFAULT NULL,
  `distance` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3432 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` bigint DEFAULT NULL,
  `shopPackageId` int NOT NULL,
  `delivered` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2838 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.shop_items
CREATE TABLE IF NOT EXISTS `shop_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopPackageId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` int NOT NULL DEFAULT '1',
  `spawnName` varchar(255) NOT NULL,
  `spawnType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.shop_packages
CREATE TABLE IF NOT EXISTS `shop_packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `category` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT '#ff5622',
  `imageUrl` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `additionalInfo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.squads
CREATE TABLE IF NOT EXISTS `squads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `scumid` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.users
CREATE TABLE IF NOT EXISTS `users` (
  `discordId` bigint DEFAULT NULL,
  `scumId` varchar(255) DEFAULT NULL,
  `steamId64` varchar(255) DEFAULT NULL,
  `welcomePackReceived` datetime DEFAULT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `presence` varchar(255) NOT NULL DEFAULT 'offline',
  `ign` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `presenceUpdatedAt` datetime DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `squadScumId` int DEFAULT NULL,
  `squadRank` int DEFAULT NULL,
  `squadUpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `steamId64_discordId` (`steamId64`,`discordId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.violations
CREATE TABLE IF NOT EXISTS `violations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `reason` text,
  `violationDate` date DEFAULT NULL,
  `fine` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table scumbot_development.weapon_images
CREATE TABLE IF NOT EXISTS `weapon_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lookup` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table scumbot_development.weapon_images: ~124 rows (approximately)
/*!40000 ALTER TABLE `weapon_images` DISABLE KEYS */;
INSERT INTO `weapon_images` (`id`, `lookup`, `name`, `url`) VALUES
	(1, 'BP_Weapon_AKS_74U', 'AKS 74U', 'https://iili.io/RjD4TJ.png'),
	(2, 'BP_Frag_Grenade', 'Frag Grenade', 'https://iili.io/Rjbvn4.png'),
	(3, 'ImprovisedClaymore', 'Improvised Claymore', 'https://iili.io/Rjbetf.png'),
	(4, 'ImprovisedMine', 'Improvised Mine', 'https://iili.io/RjbOwG.png'),
	(5, 'PipeBomb', 'Pipe Bomb', 'https://iili.io/Rjbw9n.png'),
	(6, 'PressureCookerBomb', 'Pressure Cooker Bomb', 'https://iili.io/RjbNus.png'),
	(7, 'PromTrap', 'PROM-1 Mine', 'https://iili.io/Rjbh8X.png'),
	(8, 'Mine_02', 'Small Anti-Personnel Mine', 'https://iili.io/RjbM6N.png'),
	(9, 'Mine_01', 'Anti-Personnel Mine', 'https://iili.io/RjbGGp.png'),
	(10, 'Claymore', 'Claymore', 'https://iili.io/RjbXat.png'),
	(11, 'BP_C4', 'C4 Bomb', 'https://iili.io/RjbWFI.png'),
	(12, '2H_Axe', 'Axe', 'https://iili.io/RjmmXf.png'),
	(13, '2H_Baseball_Bat', 'Baseball Bat', 'https://iili.io/RjmbzG.png'),
	(14, '2H_Baseball_Bat_With_Wire', 'Baseball Bat with Barbedwire', 'https://iili.io/Rjmtbs.png'),
	(15, '2H_Baseball_Bat_With_Spikes', 'Baseball Bat with Nails', 'https://iili.io/RjmZen.png'),
	(16, '1H_Police_Baton', 'Police Baton', 'https://iili.io/RjmLJt.png'),
	(17, '2H_Stone_Axe', 'Big Stone Axe', 'https://iili.io/RjmP0N.png'),
	(18, '2H_Baseball_Bat_Blaze', 'Blaze Bat', 'https://iili.io/RjmigI.png'),
	(19, '1H_Brass_Knuckles', 'Brass Knuckles', 'https://iili.io/RjmQ5X.png'),
	(20, '1H_Bushman', 'Bushman', 'https://iili.io/Rjm6fp.png'),
	(21, 'BP_Chainsaw', 'Chainsaw', 'https://iili.io/RjmrsR.png'),
	(22, '1H_Cleaver', 'Cleaver', 'https://iili.io/RjmgWv.png'),
	(23, '1H_Crowbar', 'Crowbar', 'https://iili.io/Rjmk5F.png'),
	(24, 'Crutch', 'Crutch', 'https://iili.io/RjmvOg.png'),
	(25, '1H_Dildo', 'Dildo', 'https://iili.io/RjmUzJ.png'),
	(26, 'Dildo_Spear', 'Dildo Spear', 'https://iili.io/Rjm8ba.png'),
	(27, '1H_Hunter', 'Hunter', 'https://iili.io/RjmjfV.png'),
	(28, '1H_Improvised_Hammer', 'Improvised Hammer', 'https://iili.io/RjmXiQ.png'),
	(29, '1H_Hatchet', 'Improvised Hatchet', 'https://iili.io/Rjmw0B.png'),
	(30, '2H_Improvised_Metal_Shovel', 'Improvised Metal Shovel', 'https://iili.io/RjmWWx.png'),
	(31, '2H_Improvised_Shovel', 'Improvised Shovel', 'https://iili.io/Rjm0J9.png'),
	(32, 'Improvised_Metal_Spear', 'Improvised Metal Spear', 'https://iili.io/RjmVxj.png'),
	(33, 'Improvised_Wooden_Spear', 'Improvised Wooden Spear', 'https://iili.io/RjmGDb.png'),
	(34, '2H_Katana', 'Katana', 'https://iili.io/RjmcU7.png'),
	(35, '1H_KitchenKnife', 'Kitchen Knife', 'https://iili.io/Rjm1Re.png'),
	(36, '1H_KitchenKnife_02', 'Kitchen Knife', 'https://iili.io/RjmEOu.png'),
	(37, '1H_KitchenKnife_03', 'Kitchen Knife', NULL),
	(38, '1H_KitchenKnife_04', 'Kitchen Knife', 'https://iili.io/RjmYf2.png'),
	(39, '1H_Kunai', 'Kunai', NULL),
	(40, '1H_Little_Spade', 'Little Spade', 'https://iili.io/Rjm5il.png'),
	(41, '1H_Medieval_Sword', 'Medieval Sword', 'https://iili.io/RjmRV4.png'),
	(42, '2H_Metal_Axe', 'Metal Axe', 'https://iili.io/RjmAxf.png'),
	(43, '2H_Metal_Baseball_Bat', 'Metal Baseball Bat', 'https://iili.io/RjmTDG.png'),
	(44, '1H_Improvised_Metal_Knife', 'Metal Knife', 'https://iili.io/RjbtMQ.png'),
	(45, '1H_Metal_Pipe', 'Metal Pipe', 'https://iili.io/RjmINs.png'),
	(46, '1H_Metal_Sword', 'Metal Sword', 'https://iili.io/RjmxHX.png'),
	(47, '1H_MK5000_Black', 'MK5000', 'https://iili.io/RjmzRn.png'),
	(48, '1H_MK5000_Metal', 'MK5000', 'https://iili.io/RjmnSt.png'),
	(49, '2H_Pickaxe', 'Pickaxe', 'https://iili.io/RjmClI.png'),
	(50, '2H_Pitchfork', 'Pitchfork', 'https://iili.io/RjmBKN.png'),
	(51, '2H_Pitchfork_Bent', 'Pitchfork', 'https://iili.io/RjmfPp.png'),
	(52, '1H_Scalpel', 'Scalpel', 'https://iili.io/RjmKVR.png'),
	(53, '1H_Scout_Black', 'Scout', 'https://iili.io/RjmFov.png'),
	(54, '1H_Scout_White', 'Scout', 'https://iili.io/RjmHHF.png'),
	(55, '2H_Shovel_02', 'Shovel', 'https://iili.io/RjmJAg.png'),
	(56, '1H_Shuriken', 'Shuriken', 'https://iili.io/RjmdNa.png'),
	(57, 'Sledgehammer', 'Sledgehammer', 'https://iili.io/Rjm2DJ.png'),
	(58, '1H_Small_Axe', 'Small Axe', 'https://iili.io/RjbpcP.png'),
	(59, '2H_Shovel_01', 'Shovel', 'https://iili.io/RjbmKB.png'),
	(60, '1H_Stone_Axe', 'Stone Axe', 'https://iili.io/RjbDPV.png'),
	(61, '1H_ImprovisedKnife', 'Stone Knife', 'https://iili.io/RjbtMQ.png'),
	(62, '2H_Katana1', 'Vhendya\'s Katana', 'https://iili.io/RjbZox.png'),
	(63, '1H_Wooden_Club', 'Wooden Club', 'https://iili.io/RjbLtj.png'),
	(64, '1H_Wooden_Club_With_Wire', 'Wooden Club with Barbedwire', 'https://iili.io/Rjbswb.png'),
	(65, '1H_Wooden_Club_With_Spikes', 'Wooden Club with Nails', 'https://iili.io/RjbP9e.png'),
	(66, '2H_Wooden_Sword', 'Wooden Sword', 'https://iili.io/Rjb4S9.png'),
	(67, '1H_Wrench_Pipe', 'Pipe Wrench', 'https://iili.io/RjbiAu.png'),
	(68, 'BPC_Weapon_AK15', 'AK15', 'https://iili.io/RjDLEN.png'),
	(69, 'BP_Weapon_AK47', 'AK47', 'https://iili.io/RjDsBp.png'),
	(70, 'BPC_Weapon_AK47_Engraved', 'AK47 Engraved', 'https://iili.io/RjDPQR.png'),
	(71, 'BPC_Weapon_AKM', 'AKM', 'https://iili.io/RjD6hv.png'),
	(72, 'BP_Weapon_AS_Val', 'AS Val', 'https://iili.io/RjDgpa.png'),
	(73, 'BPC_Recurve_Bow_100', 'Ballista (100)', 'https://iili.io/RjD821.png'),
	(74, 'BPC_Recurve_Bow_90', 'BlackHawk (90)', 'https://iili.io/RjD821.png'),
	(75, 'BP_Weapon_BlackHawk_Crossbow', 'BlackHawk Crossbow', 'https://iili.io/RjDUkg.png'),
	(76, 'BP_Weapon_Block21', 'Block 21', 'https://iili.io/RjDSYF.png'),
	(77, 'BPC_Recurve_Bow_50', 'Cobra (50)', 'https://iili.io/RjD821.png'),
	(78, 'Compound_Bow', 'Compound Bow', 'https://iili.io/RjDkrP.png'),
	(79, 'BPC_Weapon_Deagle_357', 'Desert Eagle .357', 'https://iili.io/RjDeEB.png'),
	(80, 'BP_Weapon_DEagle_50', 'Desert Eagle .50', 'https://iili.io/RjDeEB.png'),
	(81, 'BP_Weapon_FlareGun', 'FlareGun', 'https://iili.io/RjDOBV.png'),
	(82, 'BP_Weapon_Hunter85', 'Hunter 85', 'https://iili.io/RjDwLQ.png'),
	(83, 'BP_Weapon_Improvised_AutoCrossbow', 'Improvised Autocrossbow', 'https://iili.io/RjDjhx.png'),
	(84, 'Improvised_Bow', 'Improvised Bow (20)', 'https://iili.io/RjDhIj.png'),
	(85, 'BPC_Improvised_Bow_25', 'Improvised Bow (25)', 'https://iili.io/RjDhIj.png'),
	(86, 'BPC_Improvised_Bow_30', 'Improvised Bow (30)', 'https://iili.io/RjDhIj.png'),
	(87, 'BPC_Improvised_Bow_35', 'Improvised Bow (35)', 'https://iili.io/RjDhIj.png'),
	(88, 'BP_Weapon_Improvised_Crossbow', 'Improvised Crossbow', 'https://iili.io/RjDWmb.png'),
	(89, 'BP_Weapon_Improvised_Handgun', 'Improvised Handgun .50', 'https://iili.io/RjDVku.png'),
	(90, 'BP_Weapon_Improvised_Shotgun', 'Improvised Shotgun', 'https://iili.io/RjDM7e.png'),
	(91, 'BPC_Weapon_Judge44', 'Judge 44', NULL),
	(92, 'BP_Weapon_98k_Karabiner', 'Kar98', 'https://iili.io/RjDG29.png'),
	(93, 'BPC_Recurve_Bow_60', 'Kodiak (60)', 'https://iili.io/RjD821.png'),
	(94, 'BP_Weapon_M1_Garand', 'M1 Grand', 'https://iili.io/RjD1r7.png'),
	(95, 'BP_Weapon_M16A4', 'M16A4', 'https://iili.io/RjD01S.png'),
	(96, 'BP_Weapon_M1887', 'M1887', 'https://iili.io/RjDlB2.png'),
	(97, 'BPC_Weapon_M1887_Sawed_off', 'M1887 Sawed Off', 'https://iili.io/RjDaLl.png'),
	(98, 'BP_Weapon_MosinNagant', 'M1891 Mosin Nagant', 'https://iili.io/RjDYX4.png'),
	(99, 'BPC_Weapon_M1911', 'M1911', 'https://iili.io/RjD7If.png'),
	(100, 'BPC_Weapon_M1911_Engraved', 'M1911 Engraved', 'https://iili.io/RjDRmG.png'),
	(101, 'BPC_Weapon_M1911_Gold', 'M1911 Gold', 'https://iili.io/RjDAes.png'),
	(102, 'BP_Weapon_M82A1', 'M82A1', 'https://iili.io/RjDu7n.png'),
	(103, 'BPC_Weapon_M82A1_Black', 'M82A1', 'https://iili.io/RjDTdX.png'),
	(104, 'BPC_Weapon_M82A1_Desert', 'M82A1', 'https://iili.io/RjDzgt.png'),
	(105, 'BPC_Weapon_M82A1_Snow', 'M82A1', 'https://iili.io/RjDoqN.png'),
	(106, 'BP_Weapon_Magnum357', 'Magnum 357', NULL),
	(107, 'BP_Weapon_MK18', 'MK18', 'https://iili.io/RjDCsp.png'),
	(108, 'BPC_Recurve_Bow_80', 'Mowhawk (80)', NULL),
	(109, 'BP_Weapon_MP5', 'MP5', 'https://iili.io/RjDx1I.png'),
	(110, 'BPC_Weapon_MP5_K', 'MP5 K', NULL),
	(111, 'BPC_Weapon_MP5_SD', 'MP5 SD', 'https://iili.io/RjDBXR.png'),
	(112, 'BPC_Weapon_PeaceKeeper38', 'PeaceKeeper 38', NULL),
	(113, 'BPC_Recurve_Bow_70', 'Predator (70)', 'https://iili.io/RjD821.png'),
	(114, 'Recurve_Bow', 'Scorpion (40)', 'https://iili.io/RjD821.png'),
	(115, 'BPC_Weapon_SDASS', 'SDASS 12M', 'https://iili.io/RjDKmJ.png'),
	(116, 'BPC_Weapon_Serpent357', 'Serpent 357', NULL),
	(117, 'BP_Weapon_SVD_Dragunov', 'SVD', 'https://iili.io/RjDFea.png'),
	(118, 'BP_Weapon_590A11', 'TEC01 490', 'https://iili.io/RjD35g.png'),
	(119, 'BP_Weapon_M9', 'TEC01 M9', 'https://iili.io/RjD9qB.png'),
	(120, 'BPC_Weapon_M9_Silver', 'TEC01 M9', 'https://iili.io/RjDH0P.png'),
	(121, 'BPC_Weapon_UMP45', 'UMP 45', 'https://iili.io/RjD2dF.png'),
	(122, 'BPC_Weapon_VSS_VZ', 'VSS VZ', 'https://iili.io/RjDJg1.png'),
	(123, 'BPC_Weapon_98k_Karabiner', 'Kar98', 'https://iili.io/RjDG29.png'),
	(124, 'BPC_Weapon_MosinNagant', 'M1891 Mosin Nagant', 'https://iili.io/RjDYX4.png');
/*!40000 ALTER TABLE `weapon_images` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

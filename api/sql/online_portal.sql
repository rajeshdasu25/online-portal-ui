-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2020 at 04:10 PM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_portal`
--
CREATE DATABASE IF NOT EXISTS `online_portal` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `online_portal`;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
CREATE TABLE IF NOT EXISTS `forms` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `CreatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ClosedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `forms`:
--

--
-- Truncate table before insert `forms`
--

TRUNCATE TABLE `forms`;
--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`Id`, `UserId`, `Name`, `Description`, `CreatedDate`, `ClosedDate`, `ActiveStatus`) VALUES
(1, 1, 'Admin Form 1', 'Admin Form 1 Description', '2020-01-05 07:30:00', '2020-01-05 19:28:08', '1'),
(2, 2, 'Manager Form 1', 'Manager Form 1 Description', '2020-01-10 07:30:00', '2020-01-10 19:28:08', '1'),
(3, 2, 'Manager Form 2', 'Manager Form 2 Description', '2020-01-15 07:30:00', '2020-01-20 19:28:08', '1'),
(4, 1, 'Admin Form 2', 'Admin Form 2 Description', '2020-02-05 07:30:00', '2020-02-15 19:28:08', '0'),
(5, 4, 'Manager 2 Form 1', 'Manager 2 Form 1 Description', '2020-03-24 18:30:00', '2020-03-31 18:30:00', '1'),
(6, 4, 'Manager 2 Form 2', 'Manager 2 Form 2 Description', '2020-04-01 18:30:00', '2020-04-11 18:30:00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
CREATE TABLE IF NOT EXISTS `responses` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FormId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `responses`:
--

--
-- Truncate table before insert `responses`
--

TRUNCATE TABLE `responses`;
--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`Id`, `FormId`, `UserId`, `Description`, `Date`, `ActiveStatus`) VALUES
(1, 1, 1, 'Form-1 Response-1 description', '2020-04-13 15:07:11', '1'),
(2, 1, 2, 'Form-1 Response-2 description', '2020-04-13 15:07:11', '1'),
(3, 1, 3, 'Form-1 Response-3 description', '2020-04-13 15:08:40', '0'),
(4, 1, 4, 'Form-1 Response-4 description', '2020-04-13 15:08:40', '1'),
(5, 1, 5, 'Form-1 Response-5 description', '2020-04-13 15:08:40', '0'),
(6, 2, 1, 'Form-2 Response-1 description', '2020-04-13 15:09:51', '1'),
(7, 2, 2, 'Form-2 Response-2 description', '2020-04-13 15:09:51', '1'),
(8, 2, 3, 'Form-2 Response-3 description', '2020-04-13 15:09:51', '0'),
(9, 2, 4, 'Form-2 Response-4 description', '2020-04-13 15:09:51', '1'),
(10, 2, 5, 'Form-2 Response-5 description', '2020-04-13 15:09:51', '0'),
(11, 3, 1, 'Form-3 Response-1 description', '2020-04-13 15:12:27', '1'),
(12, 3, 2, 'Form-3 Response-2 description', '2020-04-13 15:12:27', '1'),
(13, 3, 3, 'Form-3 Response-3 description', '2020-04-13 15:12:27', '0'),
(14, 3, 4, 'Form-3 Response-4 description', '2020-04-13 15:12:27', '1'),
(15, 3, 5, 'Form-3 Response-5 description', '2020-04-13 15:12:27', '0'),
(16, 4, 1, 'Form-4 Response-1 description', '2020-04-13 15:12:27', '1'),
(17, 4, 2, 'Form-4 Response-2 description', '2020-04-13 15:12:27', '1'),
(18, 4, 3, 'Form-4 Response-3 description', '2020-04-13 15:12:27', '0'),
(19, 4, 4, 'Form-4 Response-4 description', '2020-04-13 15:12:27', '1'),
(20, 4, 5, 'Form-4 Response-5 description', '2020-04-13 15:12:27', '0'),
(21, 5, 1, 'Form-5 Response-1 description', '2020-04-13 15:12:27', '1'),
(22, 5, 2, 'Form-5 Response-2 description', '2020-04-13 15:12:27', '1'),
(23, 5, 3, 'Form-5 Response-3 description', '2020-04-13 15:12:27', '0'),
(24, 5, 4, 'Form-5 Response-4 description', '2020-04-13 15:12:27', '1'),
(25, 5, 5, 'Form-5 Response-5 description', '2020-04-13 15:12:27', '0');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL,
  `DisplayName` varchar(256) NOT NULL,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `roles`:
--

--
-- Truncate table before insert `roles`
--

TRUNCATE TABLE `roles`;
--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`Id`, `Name`, `DisplayName`, `ActiveStatus`) VALUES
(1, 'ui', 'Frontend Developer', '1'),
(2, 'java', 'JAVA Developer', '1'),
(3, 'devops', 'DevOPS Engineer', '1'),
(4, 'batch', 'Batch Developer', '1'),
(5, 'microservice', 'Microservice Developer', '1'),
(6, 'dba', 'Database Administrator', '1'),
(7, 'Oracle', 'Oracle Developer', '1');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `DisplayName` varchar(256) NOT NULL,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `skills`:
--

--
-- Truncate table before insert `skills`
--

TRUNCATE TABLE `skills`;
--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`Id`, `RoleId`, `Name`, `DisplayName`, `ActiveStatus`) VALUES
(1, 1, 'html5', 'HTML 5', '1'),
(2, 1, 'css3', 'CSS 3', '1'),
(3, 1, 'javascript', 'Javascript', '1'),
(4, 1, 'jquery', 'jQuery', '1'),
(5, 1, 'angular', 'Angular', '1'),
(6, 1, 'react', 'React', '1'),
(7, 2, 'java', 'JAVA', '1'),
(8, 2, 'spring', 'Spring', '1'),
(9, 2, 'hybernet', 'Hybernet', '1'),
(10, 3, 'cicd', 'CI & CD', '1'),
(11, 3, 'aws', 'AWS', '1'),
(12, 3, 'jenkins', 'Jenkins', '1'),
(13, 3, 'newrelic', 'NewRelic', '1'),
(14, 6, 'sql', 'SQL', '1'),
(15, 6, 'mysql', 'MySQL', '1'),
(16, 6, 'postgresql', 'PostgreSQL', '1'),
(17, 6, 'NoSQL', 'NoSQL', '1'),
(18, 0, '', '', '1'),
(19, 7, 'oracle', 'Oracle', '1'),
(20, 0, '', '', '1'),
(21, 7, 'oracle', 'Oracle', '1'),
(22, 0, '', '', '1'),
(23, 7, 'oracle', 'Oracle', '1');

-- --------------------------------------------------------

--
-- Table structure for table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
CREATE TABLE IF NOT EXISTS `trainings` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `trainings`:
--

--
-- Truncate table before insert `trainings`
--

TRUNCATE TABLE `trainings`;
--
-- Dumping data for table `trainings`
--

INSERT INTO `trainings` (`Id`, `Name`, `Description`, `ActiveStatus`) VALUES
(1, 'Training - 1', 'Training 1 description', '1'),
(2, 'Training - 2', 'Training 2 description', '1'),
(3, 'Training - 3', 'Training 3 description', '1'),
(4, 'Training - 4', 'Training 4 description', '1'),
(5, 'Training - 5', 'Training - 5 Description', '1'),
(6, 'Training - 6', 'Training - 6 description', '1'),
(7, 'Training - 7', 'Training - 7 description', '1'),
(8, 'Training - 8', 'Training - 8 Description', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `SsoId` int(11) NOT NULL,
  `UserTypeId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL DEFAULT '1',
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Username` varchar(64) NOT NULL,
  `Pword` varchar(50) NOT NULL,
  `EmailAddr` varchar(128) NOT NULL,
  `Phoneno` varchar(255) NOT NULL COMMENT 'comma seperated',
  `TimeRegistered` timestamp NULL DEFAULT NULL,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Username` (`Username`),
  KEY `Phoneno` (`Phoneno`),
  KEY `ActiveStatus` (`ActiveStatus`),
  KEY `Pword` (`Pword`),
  KEY `EmailAddr` (`EmailAddr`),
  KEY `FirstName` (`FirstName`),
  KEY `LastName` (`LastName`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Truncate table before insert `users`
--

TRUNCATE TABLE `users`;
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `SsoId`, `UserTypeId`, `RoleId`, `FirstName`, `LastName`, `Username`, `Pword`, `EmailAddr`, `Phoneno`, `TimeRegistered`, `ActiveStatus`) VALUES
(1, 1, 1, 6, 'Admin', '1', 'admin', 'admin', 'admin@admin.com', '0123456789', '2020-04-13 05:44:00', '1'),
(2, 2, 2, 2, 'Manager', '1', 'manager', 'manager', 'manager@manager.com', '9876543210', '2020-04-13 05:44:00', '1'),
(3, 3, 3, 1, 'Rajesh', 'Kumar', 'rajesh', 'rajesh', 'rajesh@rajesh.com', '9876501234', '2020-04-13 05:44:00', '1'),
(4, 4, 2, 3, 'Manager', '2', 'manager2', 'manager2', 'manager2@manager2.com', '1245789630', '2020-04-13 05:44:00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
CREATE TABLE IF NOT EXISTS `user_types` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(256) NOT NULL,
  `ActiveStatus` enum('1','0') NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- RELATIONSHIPS FOR TABLE `user_types`:
--

--
-- Truncate table before insert `user_types`
--

TRUNCATE TABLE `user_types`;
--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`Id`, `Name`, `ActiveStatus`) VALUES
(1, 'Admin', '1'),
(2, 'Manager', '1'),
(3, 'NonManager', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2024 at 08:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `pin` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `phone`, `pin`, `address`, `town`) VALUES
(5, 'steve', '76854678', '676753', 'ernakulam', 'india'),
(6, 'leon', '76854678', '676753', 'pazhayangadi', 'kannur'),
(7, 'shuhaib', '776554578', '657245', 'parappa', 'kasaragod'),
(8, 'vyshnav', '45678867', '654654', 'kannur', 'kerala'),
(9, 'anunand', '1234567895', '657876', 'pazhayangadi', 'dubai');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orderDetailId` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`orderDetailId`, `orderId`, `productId`) VALUES
(4, 4, 111),
(5, 4, 112),
(6, 4, 113),
(7, 5, 111),
(8, 5, 212),
(9, 5, 313),
(10, 6, 111),
(11, 6, 112),
(12, 6, 313),
(13, 7, 313),
(14, 7, 312),
(15, 8, 111),
(16, 8, 112),
(17, 8, 315),
(18, 8, 314);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `customerId`, `price`) VALUES
(4, 5, 5660.30),
(5, 6, 6533.30),
(6, 7, 6533.30),
(7, 8, 4374.20),
(8, 9, 8782.40);

-- --------------------------------------------------------

--
-- Table structure for table `productdetails`
--

CREATE TABLE `productdetails` (
  `productId` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `availableSizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`availableSizes`)),
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productdetails`
--

INSERT INTO `productdetails` (`productId`, `img`, `name`, `company`, `availableSizes`, `price`) VALUES
(111, 'https://wallpapercave.com/wp/wp5640980.jpg', 'Rebel white', 'Abidas', '[\"M\", \"L\", \"XL\"]', 2599),
(112, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flivecinemanews.com%2Fwp-content%2Fuploads%2F2020%2F12%2FHandsome-Thalapathy-Vijay-51511-1140x1520.jpg&f=1&nofb=1&ipt=689327f8e152c95f0621d18c932f0c325cb4473d6aeb22ad00214e0f212e6dc3&ipo=images', 'Verithanam', 'Pooma', '[\"S\", \"M\", \"L\", \"XL\"]', 1799),
(113, 'https://wallpapercave.com/wp/wp4005297.jpg', 'jacket', 'adibas', '[\"S\", \"M\", \"L\", \"XL\"]', 1129),
(114, 'https://img.mensxp.com/media/content/2021/Jan/Lesser-Known-Facts-About-Yash-7_60056af9146ec.jpeg', 'Bun Jacket', 'Hombale', '[\"S\", \"M\", \"L\", \"XL\"]', 1499),
(115, 'https://i.pinimg.com/originals/e3/94/06/e394067d60834cb6deaed2efd72b0432.jpg', 'Challeyya Hoodie', 'Atlee Outfits', '[\"S\", \"M\", \"L\", \"XL\"]', 1999),
(116, 'https://tse3.mm.bing.net/th?id=OIP.PVeu8EcCJqMcDx6sZ3u17gHaJQ&pid=Api', 'Thaggdale', '(No Brand)', '[\"S\", \"M\", \"L\", \"XL\"]', 1299),
(117, 'https://i.pinimg.com/originals/c8/85/b4/c885b437c210cb6c05e9ce0dce3291fa.jpg', 'Minnal Tshirt', 'Peter Englund', '[\"S\", \"M\", \"L\", \"XL\"]', 999),
(118, 'https://filmfare.wwmindia.com/content/2020/oct/prithvirajsukumaran11604124273.jpg', 'Mannar Shirt', 'Khansaar', '[\"S\", \"M\", \"L\", \"XL\"]', 1199),
(119, 'https://static.moviecrow.com/gallery/20230109/210772-Jailer%20Mohanlal.jpg', 'Mathew', 'Qureshi', '[\"S\", \"M\", \"L\", \"XL\"]', 2999),
(211, 'https://wallpapercave.com/wp/wp4426207.jpg', 'Elegance Essence', 'Feminique Creations', '[\"S\", \"M\", \"L\", \"XL\"]', 2599),
(212, 'https://tse3.mm.bing.net/th?id=OIP.GsvxXrXta8bJ5ND-KDbNtwHaLH&pid=Api', 'Royal Blossom', 'Eleganza Couture', '[\"S\", \"M\", \"L\", \"XL\"]', 1799),
(213, 'https://i2.wp.com/www.socialnews.xyz/wp-content/uploads/2018/12/27/Actress-SriNidhi-Shetty-Stills-from-KGF-Movie-Success-Meet-39.JPG?fit=1024%2C1536&quality=90&zoom=1&ssl=1', 'Sunset Serenity', 'Ladies Charm', '[\"S\", \"M\", \"L\", \"XL\"]', 1199),
(214, 'https://i.redd.it/5nrr7l8qznk91.jpg', 'Mystic Mirage', 'Divine Threads', '[\"S\", \"M\", \"L\", \"XL\"]', 1499),
(215, 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Factress-galaxy.com%2Fwp-content%2Fuploads%2F2022%2F09%2FSrinidhi-Shetty-Latest-Gorgeous-Photos-3.jpg&f=1&nofb=1&ipt=621cb9b132e665a2679db2e5c43e485d7cafc1b05a1edec758c61d9ae5e5792c&ipo=images', 'Enchanting Elegance', 'Graceful Attire', '[\"S\", \"M\", \"L\", \"XL\"]', 1999),
(216, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-7pbLjUFy2l0%2FXJD4JbxmZtI%2FAAAAAAAAm50%2FLBHCV3hv3DQKxLvta48EbC6aQ7wvm7gAQCLcBGAs%2Fs1600%2Fsrinidhi-shetty-photo-stills%252B%2525281%252529.jpg&f=1&nofb=1&ipt=1af562d98a6f9', 'Mystical Meadow', 'Harmony Couturiers', '[\"S\", \"M\", \"L\", \"XL\"]', 1299),
(217, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.news18.com%2Fkannada%2Fuploads%2F2019%2F09%2FSrinidhi-ShettyG10.jpg%3Fim%3DResize%2Cwidth%3D904%2Caspect%3Dfit%2Ctype%3Dnormal&f=1&nofb=1&ipt=4f50cbf7c940747d418874d88a9b12cd30bd7213980742', 'Golden Grace', 'Radiant Styles', '[\"S\", \"M\", \"L\", \"XL\"]', 999),
(218, 'https://wallpapercave.com/wp/wp4426250.jpg', 'Silken Symphony', 'Opulent Trends', '[\"S\", \"M\", \"L\", \"XL\"]', 1199),
(219, 'https://photos.telugurajyam.com/wp-content/uploads/2023/03/Srinidhi-Shetty-3.jpg', 'Moonlit Melody', 'Velvet Verve', '[\"S\", \"M\", \"L\", \"XL\"]', 1399),
(311, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0oqwFnOzoop7ZhMBY1bjZLwzCBiMivMvzd8IaFlb9IZLq1hGGa-zEdetPvwpoCxPm5wo&usqp=CAU', 'Casual Top', 'Trendy Wear', '[\"XL\"]', 2999),
(312, 'https://www.forbesindia.com/media/images/2021/Oct/img_169893_superstarmaheshbabu.jpg', 'classy', 'Style Ltd.', '[\"M\", \"L\", \"XL\"]', 1999),
(313, 'https://content.tupaki.com/twdata/2019/0119/photos/actress/Tamanna%20At%20F2%20Trailer%20Launch%20Photos/normal/Tamanna%20At%20F2%20Trailer%20Launch%20Photos_4.jpg', 'blacky', 'Trendy Wear', '[\"XS\", \"S\", \"M\"]', 2099),
(314, 'https://content.tupaki.com/h-upload/2023/10/04/166631-1.webp', 'Honey Saree', 'Casual Apparel', '[\"L\", \"XL\"]', 2199),
(315, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQ2HlGVAqodCykGrZkwvDjN12DbWr5LxQWWO27-r9TT2KeBpMuk4Jni55u0aSPnJjn5Y&usqp=CAU', 'Rocky suit', 'Chic Fashion', '[\"S\", \"M\", \"L\", \"XL\"]', 2399),
(316, 'https://moviegalleri.net/wp-content/gallery/nazriya-ante-sundaraniki-sm/Nazriya-Nazim-%40-Ante-Sundaraniki-Success-Meet1276497.jpg', 'Traditional', 'Urban Outfit', '[\"XS\", \"S\"]', 2499),
(317, 'https://img.etimg.com/thumb/width-640,height-480,imgsize-85028,resizemode-75,msid-106618380/news/international/us/ariana-grandes-first-single-from-new-album-release-date-revealed-details-here/ariana-grande.jpg', 'Grande skirt', 'fashion.co', '[\"S\", \"M\"]', 2699),
(318, 'https://e0.pxfuel.com/wallpapers/481/116/desktop-wallpaper-now-this-we-call-men-johnny-sins.jpg', 'Executive ', 'Style Ltd.', '[\"M\", \"L\"]', 2799),
(319, 'https://tamilglitz.in/wp-content/uploads/2021/01/Surya-Traditional-650x811.jpg', 'kerala combo', 'Fashion Co.', '[\"S\", \"M\", \"L\"]', 1799);

-- --------------------------------------------------------

--
-- Table structure for table `userdata`
--

CREATE TABLE `userdata` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `username` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdata`
--

INSERT INTO `userdata` (`id`, `name`, `username`, `password`) VALUES
(2, 'sample', 'sampleuser', 'sample123'),
(4, 'heyy', 'hoyyy', '123abc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orderDetailId`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `productdetails`
--
ALTER TABLE `productdetails`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orderDetailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `productdetails` (`productId`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

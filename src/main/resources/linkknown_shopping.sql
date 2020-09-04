CREATE TABLE `good` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `good_name` varchar(200) COLLATE utf8_bin NOT NULL,
  `good_price` double(16,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 21, 2020 at 09:16 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Delilah_Resto`
--

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `status` enum('nuevo','confirmado','preparando','enviado','entregado') DEFAULT 'nuevo',
  `descripcion` varchar(256) DEFAULT NULL,
  `forma_de_pago` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id`, `status`, `descripcion`, `forma_de_pago`, `usuario_id`, `total`, `fecha_pedido`) VALUES
(3, 'nuevo', NULL, 'tarjeta', 1, 890, '2020-07-21 21:13:16'),
(4, 'nuevo', NULL, 'efectivo', 2, 720, '2020-07-21 21:14:31');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos_productos`
--

CREATE TABLE `pedidos_productos` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pedidos_productos`
--

INSERT INTO `pedidos_productos` (`id`, `pedido_id`, `producto_id`, `cantidad`) VALUES
(311, 3, 1, 1),
(312, 3, 2, 1),
(313, 3, 3, 1),
(314, 4, 1, 1),
(315, 4, 3, 1),
(316, 4, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre_plato` varchar(255) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre_plato`, `detalle`, `foto`, `precio`) VALUES
(1, 'Sandwich veggie', 'Sandwich de salmon con pan de harina de almendras.', 'https://unsplash.com/photos/ddZYOtZUnBk', 360),
(2, 'Sandwich de Mila', 'Sandwich de scarne de ternera', 'https://unsplash.com/photos/ddZYOtZUnBk', 350),
(3, 'Sandwich de Chori', 'Sandwich de chorizo cacero', 'https://unsplash.com/photos/ddZYOtZUnBk', 180);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `isAdmin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`, `isActive`, `isAdmin`) VALUES
(1, 'mcanzani', 'matias', 'canzani', 'test@test.com', 121212, 'ciudad de la paz 151', '$2b$10$zqdp20LMN/jWhWMNZWqvuul3X8gwbIp8KubzhQ2wWf4WMkNN5yDLG', 1, 1),
(2, 'pmarini', 'pedro', 'marini', 'test@test.com', 121212, 'acacerca 222', '$2b$10$amLqsA6PqVn8.xaNMNBDxel3hdhj0exTxTWqd2/ob1JyqKG2ZGa.C', 1, 0),
(3, 'vborzori', 'valeria', 'brozori', 'test@2test.com', 121212, 'mascerca 111', '$2b$10$t2/2x7nnPjCS5Gu/Okxhr.md1CQg67LkVDOoNnbpVV/FJ89GciT6u', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `descripcion` (`descripcion`);

--
-- Indexes for table `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `pedidos_productos`
--
ALTER TABLE `pedidos_productos`
  ADD CONSTRAINT `pedidos_productos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `pedidos_productos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

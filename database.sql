# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: us-cdbr-east-02.cleardb.com (MySQL 5.5.62-log)
# Base de datos: heroku_87e325f58fecdec
# Tiempo de Generación: 2020-07-21 18:11:32 +0000
# ************************************************************

# Volcado de tabla usuarios

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `password`, `isActive`, `isAdmin`)
VALUES
	(1,'mcanzani','matias','canzani','test@test.com',121212,'ciudad de la paz 151','$2b$10$mkhueQIylXKna.VyYGXJ/.9PDkfcMQuB1XQti8dl7E/D5M9J0gyN6',1,1),
	(2,'pmarini','pedro','marini','test@test.com',121212,'acacerca 123','$2b$10$o3a5RPf7iMY.s3iBGAi.j.F/OdNPPbdgZv.ZU2Z1RV003Us2ONAqG',1,0),
	(3,'vborzori','valeria','borzori','test@test.com',1212121,'muy cerca 223','$2b$10$j2rsl8HLGU5CX8FnvxWNIuzKecTWegI20hvnpDnlB3z.NFUnWRipK',1,0);

/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

# ------------------------------------------------------------
# Volcado de tabla productos
DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_plato` varchar(255) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;

INSERT INTO `productos` (`id`, `nombre_plato`, `detalle`, `foto`, `precio`)
VALUES
	(1,'Mila con pure','Milanesa de ternera con pure de papas','https://loremflickr.com/320/240/food',380),
	(2,'Fideos con crema','Tallarines caseros con crema de leche','https://loremflickr.com/320/240/food',250);

/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

# ------------------------------------------------------------

\
# Volcado de tabla pedidos_productos

DROP TABLE IF EXISTS `pedidos_productos`;

CREATE TABLE `pedidos_productos` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(2) DEFAULT NULL,
  `producto_id` int(2) DEFAULT NULL,
  `cantidad` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `pedidos_productos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `pedidos_productos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pedidos_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_productos` DISABLE KEYS */;

INSERT INTO `pedidos_productos` (`id`, `pedido_id`, `producto_id`, `cantidad`)
VALUES
	(1,1,1,1);

/*!40000 ALTER TABLE `pedidos_productos` ENABLE KEYS */;
UNLOCK TABLES;

# ------------------------------------------------------------

# Volcado de tabla pedidos

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `status` enum('nuevo','confirmado','preparando','enviado','entregado') DEFAULT 'nuevo',
  `descripcion` varchar(256) DEFAULT NULL,
  `forma_de_pago` varchar(255) DEFAULT NULL,
  `usuario_id` int(2) DEFAULT NULL,
  `total` int(2) DEFAULT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `descripcion` (`descripcion`(255)),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;

INSERT INTO `pedidos` (`id`, `status`, `descripcion`, `forma_de_pago`, `usuario_id`, `total`, `fecha_pedido`)
VALUES
	(1,'confirmado',NULL,NULL,1,380,'2020-07-20 21:54:20'),
	(2,'nuevo',NULL,NULL,1,NULL,'2020-07-21 18:06:23');

/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

# ------------------------------------------------------------
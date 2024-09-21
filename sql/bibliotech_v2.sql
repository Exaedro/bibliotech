-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2024 a las 23:37:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `bibliotech_v2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autorizaciones`
--

CREATE TABLE `autorizaciones` (
  `AutorID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `Titulo` varchar(120) NOT NULL,
  `Descripcion` varchar(500) NOT NULL,
  `Imagen` varchar(120) NOT NULL,
  `FechaAutorizacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autorizaciones`
--

INSERT INTO `autorizaciones` (`AutorID`, `UsuarioID`, `Titulo`, `Descripcion`, `Imagen`, `FechaAutorizacion`) VALUES
(10, 3, 'ddasdasdas', 'dasdasdasdas', '/uploads/fa846e3b-cf21-4f91-9c93-5739c5abba02.jpg', '2024-09-21 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `CalificacionID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL,
  `Calificacion` int(1) NOT NULL CHECK (`Calificacion` >= 1 and `Calificacion` <= 5),
  `FechaCalificacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `CategoriaID` int(11) NOT NULL,
  `NombreCategoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`CategoriaID`, `NombreCategoria`) VALUES
(1, 'Ficción'),
(2, 'No Ficción'),
(3, 'Ciencia'),
(4, 'Historia'),
(5, 'Romántico'),
(6, 'Thriller'),
(7, 'Fantástico'),
(8, 'Biografía'),
(9, 'Tecnología'),
(10, 'Cultura'),
(11, 'Misterio'),
(12, 'Aventura'),
(13, 'Infantil'),
(14, 'Juvenil'),
(15, 'Clásico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `ComentarioID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL,
  `Comentario` text NOT NULL,
  `FechaComentario` datetime DEFAULT current_timestamp(),
  `Editado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`ComentarioID`, `UsuarioID`, `LibroID`, `Comentario`, `FechaComentario`, `Editado`) VALUES
(1, 3, 4, 'hola', '2024-08-24 15:26:51', 0),
(2, 3, 4, 'elpepe', '2024-08-24 16:36:19', 0),
(3, 3, 4, 'muy buen libro, me gusto mucho', '2024-08-24 18:18:43', 0),
(4, 3, 4, 'el pepe', '2024-08-24 18:27:20', 0),
(5, 3, 4, 'hola\r\n', '2024-08-24 18:28:06', 0),
(6, 3, 4, 'sddfsfsdfsd', '2024-08-24 18:54:39', 0),
(9, 3, 4, 'daskjasdasd', '2024-08-24 18:56:14', 0),
(15, 3, 12, 'muy bueno', '2024-08-24 22:20:36', 0),
(27, 3, 1, 'muy bueno me gusto', '2024-08-25 16:48:48', 0),
(30, 3, 2, 'como que ahora ponen si editaron los comentarios, re yuta', '2024-08-27 12:03:34', 1),
(31, 3, 3, 'jajaja', '2024-08-27 12:49:11', 1),
(35, 3, 3, 'elpepe', '2024-08-29 19:06:02', 0),
(36, 3, 4, 'el pepe', '2024-08-29 19:48:37', 0),
(37, 3, 4, 'dsadas', '2024-08-29 19:49:31', 0),
(38, 3, 4, 'dsadas', '2024-08-29 19:51:42', 0),
(39, 3, 4, 'fddsffsd', '2024-08-29 19:53:32', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `FavoritoID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`FavoritoID`, `UsuarioID`, `LibroID`) VALUES
(1, 3, 3),
(12, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gustados`
--

CREATE TABLE `gustados` (
  `GustadoID` int(11) NOT NULL,
  `UsuarioID` int(11) DEFAULT NULL,
  `LibroID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gustados`
--

INSERT INTO `gustados` (`GustadoID`, `UsuarioID`, `LibroID`) VALUES
(17, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `HistorialID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL,
  `FechaAccion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`HistorialID`, `UsuarioID`, `LibroID`, `FechaAccion`) VALUES
(28, 3, 5, '2024-08-29 20:19:47'),
(29, 3, 4, '2024-08-29 22:19:35'),
(30, 3, 1, '2024-08-29 22:19:44'),
(31, 3, 2, '2024-09-20 11:14:14'),
(32, 3, 3, '2024-09-20 11:23:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `LibroID` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Autor` varchar(255) NOT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  `FechaLanzamiento` date DEFAULT NULL,
  `CantidadPaginas` int(11) DEFAULT NULL,
  `Editorial` varchar(255) DEFAULT NULL,
  `Sinopsis` text DEFAULT NULL,
  `imagen` varchar(10000) NOT NULL,
  `pdf_link` varchar(255) NOT NULL,
  `Idioma` varchar(50) DEFAULT NULL,
  `Estado` enum('Disponible','Prestado','Reservado') NOT NULL,
  `Visitas` int(11) NOT NULL DEFAULT 0,
  `Gustados` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`LibroID`, `Titulo`, `Autor`, `ISBN`, `FechaLanzamiento`, `CantidadPaginas`, `Editorial`, `Sinopsis`, `imagen`, `pdf_link`, `Idioma`, `Estado`, `Visitas`, `Gustados`) VALUES
(1, 'El Gran Gatsby', 'F. Scott Fitzgerald', '9780743273565', '1925-04-10', 180, 'Scribner', 'Un retrato de la era del jazz en los Estados Unidos', 'https://www.anagrama-ed.es/uploads/media/portadas/0001/15/b2834bc4ea71357c8b549dfccdd16d611c6586ea.jpeg', 'https://www.imprentanacional.go.cr/editorialdigital/libros/literatura%20universal/el_gran_gatsby_edincr.pdf', 'Español', 'Disponible', 104, 50),
(2, 'Cien Años de Soledad', 'Gabriel García Márquez', '9780060883287', '1967-06-05', 417, 'Harper & Row', 'La historia de la familia Buendía en el pueblo ficticio de Macondo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgsUCPHp3SOTsijY_tNLp8zOiGxJCUZ0yEA&s', 'https://www.secst.cl/upfiles/documentos/19072016_1207am_578dc39115fe9.pdf', 'Español', 'Disponible', 201, 120),
(3, 'El Código Da Vinci', 'Dan Brown', '9780307474278', '2003-03-18', 689, 'Doubleday', 'Un thriller sobre la búsqueda del Santo Grial', 'https://images.cdn2.buscalibre.com/fit-in/360x360/49/54/4954e233ad1e1a43e3f8187cd91c6997.jpg', 'https://usercontent.one/wp/www.puro-geek.com/wp-content/uploads/2021/11/El-codigo-Da-Vinci-Dan-Brown.pdf?media=1630018077', 'Español', 'Prestado', 151, 80),
(4, 'Orgullo y Prejuicio', 'Jane Austen', '9780141439518', '1813-01-28', 279, 'T. Egerton', 'Una novela sobre el amor y las relaciones en la Inglaterra del siglo XIX', 'https://images.cdn3.buscalibre.com/fit-in/360x360/46/6b/466b0b47e932561b186c56358acbe55e.jpg', 'https://web.seducoahuila.gob.mx/biblioweb/upload/orgullo_y_prejuicio.pdf', 'Español', 'Disponible', 181, 60),
(5, '1984', 'George Orwell', '9780451524935', '1949-06-08', 328, 'Secker & Warburg', 'Una novela distópica sobre un régimen totalitario', 'https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg', 'https://wjccschools.org/jhs/wp-content/uploads/sites/17/2019/05/1984-Spanish.pdf', 'Inglés', 'Reservado', 253, 100),
(6, 'La Sombra del Viento', 'Carlos Ruiz Zafón', '9788408093498', '2001-04-17', 487, 'Planeta', 'Un joven descubre un libro misterioso en la Barcelona de la posguerra', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/48/m_libros/47856_portada___201609051317.jpg', 'https://cel.edu.py/v2/wp-content/uploads/2020/10/Ruiz-Zafon-Carlos-La-Sombra-Del-Viento_54Y.pdf', 'Español', 'Disponible', 130, 90),
(7, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling', '9780747532699', '1997-06-26', 223, 'Bloomsbury', 'El primer libro de la famosa serie sobre el joven mago', 'https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg', 'https://fecolsa.com.co/upload/Actividades%20Equilibrio%20Total/Rowling,%20J.%20K.%20-%20%20Harry%20Potter%20y%20la%20piedra%20filosofal.pdf', 'Inglés', 'Prestado', 301, 150),
(8, 'Los Pilares de la Tierra', 'Ken Follett', '9780451222521', '1989-08-01', 973, 'William Morrow', 'Una épica historia sobre la construcción de una catedral en la Edad Media', 'https://images.cdn2.buscalibre.com/fit-in/360x360/61/32/61328f4133cbc217435c385c1eaefd74.jpg', '', 'Inglés', 'Disponible', 160, 70),
(9, 'Matar a un Ruiseñor', 'Harper Lee', '9780061120084', '1960-07-11', 281, 'J.B. Lippincott & Co.', 'Una novela sobre la injusticia racial en el sur de los Estados Unidos', 'https://images.cdn3.buscalibre.com/fit-in/360x360/1b/d7/1bd7b432c94ccdcf816c917d8abe8e83.jpg', 'https://web.seducoahuila.gob.mx/biblioweb/upload/Harper,%20Lee%20-%20Matar%20Un%20Ruise%C3%B1or.pdf', 'Inglés', 'Disponible', 210, 80),
(10, 'El Señor de los Anillos', 'J.R.R. Tolkien', '9780261103573', '1954-07-29', 1178, 'Allen & Unwin', 'Una épica aventura en un mundo de fantasía', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIr1UuugXCIim35lyIBMaHQXLXtZqUQnnxDg&s', 'https://web.seducoahuila.gob.mx/biblioweb/upload/J.R.R.%20Tolkien%20La%20Comunidad%20del%20anillo%20I.pdf', 'Inglés', 'Reservado', 180, 110),
(11, 'Don Quijote de la Mancha', 'Miguel de Cervantes', '9788420463306', '1605-01-16', 1050, 'Francisco de Robles', 'La famosa novela sobre un caballero loco y su fiel escudero', 'https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg', 'https://cvc.cervantes.es/literatura/lee/coleccion/pdf/quijote.pdf', 'Español', 'Disponible', 190, 95),
(12, 'El Alquimista', 'Paulo Coelho', '9780061122415', '1988-05-01', 208, 'Rocco', 'La historia de un joven pastor que busca su leyenda personal', 'https://www.planetadelibros.com/usuaris/libros/fotos/201/original/portada_el-alquimista_paulo-coelho_201612191218.jpg', 'https://mep.janium.net/janium/Documentos/286143.pdf', 'Portugués', 'Prestado', 140, 65),
(13, 'La Chica del Tren', 'Paula Hawkins', '9780553448160', '2015-01-13', 325, 'Riverhead Books', 'Un thriller psicológico sobre una mujer obsesionada con la vida de otras personas', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/199/m_libros/portada_la-chica-del-tren_paula-hawkins_201611281622.jpg', 'https://sallebello.edu.co/images/La_chica_del_tren_-_Paula_Hawkins.pdf', 'Inglés', 'Disponible', 160, 75),
(14, 'El Juego del Ángel', 'Carlos Ruiz Zafón', '9788408099353', '2008-11-05', 447, 'Planeta', 'La secuela de La Sombra del Viento', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/246/m_libros/portada_el-juego-del-angel_carlos-ruiz-zafon_201701091638.jpg', '', 'Español', 'Prestado', 170, 85),
(15, 'La Casa de los Espíritus', 'Isabel Allende', '9781501116960', '1982-03-28', 448, 'Plaza & Janés', 'Una novela épica sobre la vida de una familia chilena', 'https://cdn.zendalibros.com/wp-content/uploads/2022/10/eal43438_la-casa-de-los-espiritus-scaled.jpg', 'https://www.suneo.mx/literatura/subidas/Isabel%20Allende%20La%20Casa%20de%20los%20Esp%C3%ADritus.pdf', 'Español', 'Disponible', 200, 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros_categorias`
--

CREATE TABLE `libros_categorias` (
  `LibroID` int(11) NOT NULL,
  `CategoriaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros_categorias`
--

INSERT INTO `libros_categorias` (`LibroID`, `CategoriaID`) VALUES
(1, 5),
(1, 15),
(2, 4),
(2, 15),
(3, 6),
(3, 11),
(4, 5),
(4, 15),
(5, 6),
(5, 11),
(6, 4),
(6, 7),
(7, 7),
(7, 9),
(8, 4),
(8, 13),
(9, 5),
(9, 12),
(10, 7),
(10, 12),
(11, 13),
(11, 15),
(12, 7),
(12, 14),
(13, 6),
(13, 12),
(14, 4),
(14, 14),
(15, 4),
(15, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `ReservaID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL,
  `FechaReserva` date DEFAULT NULL,
  `Estado` enum('Activa','Cancelada','Finalizada') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `RollID` int(11) NOT NULL,
  `NombreRol` enum('propietario','admin','mod','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`RollID`, `NombreRol`) VALUES
(1, 'user'),
(2, 'mod'),
(3, 'admin'),
(4, 'propietario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuarioID` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `CorreoElectronico` varchar(255) NOT NULL,
  `Imagen` varchar(255) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  `Contrasenia` varchar(255) NOT NULL,
  `RollID` int(11) NOT NULL DEFAULT 1,
  `Autor` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuarioID`, `Nombre`, `CorreoElectronico`, `Imagen`, `Contrasenia`, `RollID`, `Autor`) VALUES
(1, 'dsaasd', 'ow@gmail.com', '	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	', '123', 1, 0),
(2, 'elpepe', 'owomolo123@gmail.com', '	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	', '123', 1, 0),
(3, 'admin', 'oww@gmail.com', '/uploads/bea5ced4-b92a-4667-b14a-afad4aed1a72.jpg', '$2b$10$ha2A16xWuw0zleP0e2T6qet5jQ85zgSEBNZtIvGywAv9V436JBFE6', 3, 0),
(4, 'exaedro', 'elpepe@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$KKSaDN3FgjCqRDuiBLJMT.ivLBqN7wFtZdqxVNZqN.uUq/K1PJhCq', 1, 0),
(7, 'dasasddas', 'dasdas@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$ZaRGgVda.C4ae7TDnNboeeth/6/CV.Bt3/0zVRq/GqoRkWJQBbwzK', 1, 0),
(8, 'holaaa', 'elpopencio123@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$JSQrRWH1MFa8pFZTofdP/.3WBSeSnfsi5IlFYlvUupM9IjsMyB6xa', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ver_mas_tarde`
--

CREATE TABLE `ver_mas_tarde` (
  `TardeID` int(11) NOT NULL,
  `UsuarioID` int(11) DEFAULT NULL,
  `LibroID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ver_mas_tarde`
--

INSERT INTO `ver_mas_tarde` (`TardeID`, `UsuarioID`, `LibroID`) VALUES
(8, 3, 4),
(10, 3, 3),
(11, 3, 152);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autorizaciones`
--
ALTER TABLE `autorizaciones`
  ADD PRIMARY KEY (`AutorID`),
  ADD KEY `UsuarioID` (`UsuarioID`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`CalificacionID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CategoriaID`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`ComentarioID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`FavoritoID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `gustados`
--
ALTER TABLE `gustados`
  ADD PRIMARY KEY (`GustadoID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`HistorialID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`LibroID`);

--
-- Indices de la tabla `libros_categorias`
--
ALTER TABLE `libros_categorias`
  ADD PRIMARY KEY (`LibroID`,`CategoriaID`),
  ADD KEY `CategoriaID` (`CategoriaID`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`ReservaID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RollID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioID`),
  ADD KEY `RollID` (`RollID`);

--
-- Indices de la tabla `ver_mas_tarde`
--
ALTER TABLE `ver_mas_tarde`
  ADD PRIMARY KEY (`TardeID`),
  ADD KEY `LibroID` (`LibroID`),
  ADD KEY `UsuarioID` (`UsuarioID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autorizaciones`
--
ALTER TABLE `autorizaciones`
  MODIFY `AutorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `CalificacionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CategoriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `ComentarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `FavoritoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `gustados`
--
ALTER TABLE `gustados`
  MODIFY `GustadoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `HistorialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `LibroID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `ReservaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `RollID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ver_mas_tarde`
--
ALTER TABLE `ver_mas_tarde`
  MODIFY `TardeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autorizaciones`
--
ALTER TABLE `autorizaciones`
  ADD CONSTRAINT `autorizaciones_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`);

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `libros_categorias`
--
ALTER TABLE `libros_categorias`
  ADD CONSTRAINT `libros_categorias_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE,
  ADD CONSTRAINT `libros_categorias_ibfk_2` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`CategoriaID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`RollID`) REFERENCES `roles` (`RollID`) ON DELETE CASCADE;
COMMIT;

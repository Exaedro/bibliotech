-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2024 a las 21:31:32
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
  `LibroTitulo` varchar(120) NOT NULL,
  `Descripcion` varchar(500) NOT NULL,
  `LibroImagen` varchar(120) NOT NULL,
  `FechaAutorizacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(17, 3, 1),
(19, 3, 165),
(39, 3, 166),
(42, 10, 167),
(43, 11, 166);

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
(29, 3, 4, '2024-08-29 22:19:35'),
(30, 3, 1, '2024-08-29 22:19:44'),
(31, 3, 2, '2024-09-20 11:14:14'),
(32, 3, 3, '2024-09-20 11:23:08'),
(33, 10, 165, '2024-09-25 18:21:31'),
(35, 4, 165, '2024-09-25 19:24:53'),
(36, 3, 166, '2024-09-25 20:12:09'),
(37, 3, 165, '2024-09-25 22:33:07'),
(40, 10, 167, '2024-09-26 13:45:34'),
(41, 3, 167, '2024-09-26 19:38:19'),
(43, 13, 167, '2024-10-04 11:10:01'),
(47, 11, 167, '2024-10-09 11:16:48'),
(48, 11, 165, '2024-10-09 11:16:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `LibroID` int(11) NOT NULL,
  `Titulo` varchar(255) DEFAULT NULL,
  `Autor` varchar(255) DEFAULT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  `FechaLanzamiento` date DEFAULT current_timestamp(),
  `FechaPublicacion` datetime NOT NULL DEFAULT current_timestamp(),
  `CantidadPaginas` int(11) DEFAULT NULL,
  `Editorial` varchar(255) DEFAULT NULL,
  `Sinopsis` text DEFAULT NULL,
  `imagen` varchar(10000) DEFAULT NULL,
  `pdf_link` varchar(255) DEFAULT NULL,
  `Idioma` varchar(50) DEFAULT NULL,
  `Estado` enum('Disponible','Prestado','Reservado') DEFAULT NULL,
  `Visitas` int(11) NOT NULL DEFAULT 0,
  `Gustados` int(11) NOT NULL DEFAULT 0,
  `Original` tinyint(1) NOT NULL DEFAULT 0,
  `Tipo` enum('manga','manwha','manhua','novela') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`LibroID`, `Titulo`, `Autor`, `ISBN`, `FechaLanzamiento`, `FechaPublicacion`, `CantidadPaginas`, `Editorial`, `Sinopsis`, `imagen`, `pdf_link`, `Idioma`, `Estado`, `Visitas`, `Gustados`, `Original`, `Tipo`) VALUES
(1, 'El Gran Gatsby', 'F. Scott Fitzgerald', '9780743273565', '1925-04-10', '2024-09-25 20:45:26', 180, 'Scribner', 'Un retrato de la era del jazz en los Estados Unidos', 'https://www.anagrama-ed.es/uploads/media/portadas/0001/15/b2834bc4ea71357c8b549dfccdd16d611c6586ea.jpeg', 'https://www.imprentanacional.go.cr/editorialdigital/libros/literatura%20universal/el_gran_gatsby_edincr.pdf', 'Español', 'Disponible', 106, 50, 0, NULL),
(2, 'Cien Años de Soledad', 'Gabriel García Márquez', '9780060883287', '1967-06-05', '2024-09-25 20:45:26', 417, 'Harper & Row', 'La historia de la familia Buendía en el pueblo ficticio de Macondo', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgsUCPHp3SOTsijY_tNLp8zOiGxJCUZ0yEA&s', 'https://www.secst.cl/upfiles/documentos/19072016_1207am_578dc39115fe9.pdf', 'Español', 'Disponible', 201, 120, 0, NULL),
(3, 'El Código Da Vinci', 'Dan Brown', '9780307474278', '2003-03-18', '2024-09-25 20:45:26', 689, 'Doubleday', 'Un thriller sobre la búsqueda del Santo Grial', 'https://images.cdn2.buscalibre.com/fit-in/360x360/49/54/4954e233ad1e1a43e3f8187cd91c6997.jpg', 'https://usercontent.one/wp/www.puro-geek.com/wp-content/uploads/2021/11/El-codigo-Da-Vinci-Dan-Brown.pdf?media=1630018077', 'Español', 'Prestado', 151, 80, 0, NULL),
(4, 'Orgullo y Prejuicio', 'Jane Austen', '9780141439518', '1813-01-28', '2024-09-25 20:45:26', 279, 'T. Egerton', 'Una novela sobre el amor y las relaciones en la Inglaterra del siglo XIX', 'https://images.cdn3.buscalibre.com/fit-in/360x360/46/6b/466b0b47e932561b186c56358acbe55e.jpg', 'https://web.seducoahuila.gob.mx/biblioweb/upload/orgullo_y_prejuicio.pdf', 'Español', 'Disponible', 188, 60, 0, NULL),
(5, '1984', 'George Orwell', '9780451524935', '1949-06-08', '2024-09-25 20:45:26', 328, 'Secker & Warburg', 'Una novela distópica sobre un régimen totalitario', 'https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg', 'https://wjccschools.org/jhs/wp-content/uploads/sites/17/2019/05/1984-Spanish.pdf', 'Inglés', 'Reservado', 253, 100, 0, NULL),
(6, 'La Sombra del Viento', 'Carlos Ruiz Zafón', '9788408093498', '2001-04-17', '2024-09-25 20:45:26', 487, 'Planeta', 'Un joven descubre un libro misterioso en la Barcelona de la posguerra', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/48/m_libros/47856_portada___201609051317.jpg', 'https://cel.edu.py/v2/wp-content/uploads/2020/10/Ruiz-Zafon-Carlos-La-Sombra-Del-Viento_54Y.pdf', 'Español', 'Disponible', 131, 90, 0, NULL),
(7, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling', '9780747532699', '1997-06-26', '2024-09-25 20:45:26', 223, 'Bloomsbury', 'El primer libro de la famosa serie sobre el joven mago', 'https://images.cdn3.buscalibre.com/fit-in/360x360/ce/e6/cee6ef96dad70d3f599b953f0e50afc7.jpg', 'https://fecolsa.com.co/upload/Actividades%20Equilibrio%20Total/Rowling,%20J.%20K.%20-%20%20Harry%20Potter%20y%20la%20piedra%20filosofal.pdf', 'Inglés', 'Prestado', 301, 150, 0, NULL),
(8, 'Los Pilares de la Tierra', 'Ken Follett', '9780451222521', '1989-08-01', '2024-09-25 20:45:26', 973, 'William Morrow', 'Una épica historia sobre la construcción de una catedral en la Edad Media', 'https://images.cdn2.buscalibre.com/fit-in/360x360/61/32/61328f4133cbc217435c385c1eaefd74.jpg', '', 'Inglés', 'Disponible', 160, 70, 0, NULL),
(9, 'Matar a un Ruiseñor', 'Harper Lee', '9780061120084', '1960-07-11', '2024-09-25 20:45:26', 281, 'J.B. Lippincott & Co.', 'Una novela sobre la injusticia racial en el sur de los Estados Unidos', 'https://images.cdn3.buscalibre.com/fit-in/360x360/1b/d7/1bd7b432c94ccdcf816c917d8abe8e83.jpg', 'https://web.seducoahuila.gob.mx/biblioweb/upload/Harper,%20Lee%20-%20Matar%20Un%20Ruise%C3%B1or.pdf', 'Inglés', 'Disponible', 210, 80, 0, NULL),
(10, 'El Señor de los Anillos', 'J.R.R. Tolkien', '9780261103573', '1954-07-29', '2024-09-25 20:45:26', 1178, 'Allen & Unwin', 'Una épica aventura en un mundo de fantasía', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIr1UuugXCIim35lyIBMaHQXLXtZqUQnnxDg&s', 'https://web.seducoahuila.gob.mx/biblioweb/upload/J.R.R.%20Tolkien%20La%20Comunidad%20del%20anillo%20I.pdf', 'Inglés', 'Reservado', 180, 110, 0, NULL),
(11, 'Don Quijote de la Mancha', 'Miguel de Cervantes', '9788420463306', '1605-01-16', '2024-09-25 20:45:26', 1050, 'Francisco de Robles', 'La famosa novela sobre un caballero loco y su fiel escudero', 'https://images.cdn1.buscalibre.com/fit-in/360x360/a6/18/a618be10eae5c2a608ec6e22e6917e29.jpg', 'https://cvc.cervantes.es/literatura/lee/coleccion/pdf/quijote.pdf', 'Español', 'Disponible', 190, 95, 0, NULL),
(12, 'El Alquimista', 'Paulo Coelho', '9780061122415', '1988-05-01', '2024-09-25 20:45:26', 208, 'Rocco', 'La historia de un joven pastor que busca su leyenda personal', 'https://www.planetadelibros.com/usuaris/libros/fotos/201/original/portada_el-alquimista_paulo-coelho_201612191218.jpg', 'https://mep.janium.net/janium/Documentos/286143.pdf', 'Portugués', 'Prestado', 140, 65, 0, NULL),
(13, 'La Chica del Tren', 'Paula Hawkins', '9780553448160', '2015-01-13', '2024-09-25 20:45:26', 325, 'Riverhead Books', 'Un thriller psicológico sobre una mujer obsesionada con la vida de otras personas', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/199/m_libros/portada_la-chica-del-tren_paula-hawkins_201611281622.jpg', 'https://sallebello.edu.co/images/La_chica_del_tren_-_Paula_Hawkins.pdf', 'Inglés', 'Disponible', 160, 75, 0, NULL),
(14, 'El Juego del Ángel', 'Carlos Ruiz Zafón', '9788408099353', '2008-11-05', '2024-09-25 20:45:26', 447, 'Planeta', 'La secuela de La Sombra del Viento', 'https://www.planetadelibros.com.ar/usuaris/libros/fotos/246/m_libros/portada_el-juego-del-angel_carlos-ruiz-zafon_201701091638.jpg', '', 'Español', 'Prestado', 170, 85, 0, NULL),
(15, 'La Casa de los Espíritus', 'Isabel Allende', '9781501116960', '1982-03-28', '2024-09-25 20:45:26', 448, 'Plaza & Janés', 'Una novela épica sobre la vida de una familia chilena', 'https://cdn.zendalibros.com/wp-content/uploads/2022/10/eal43438_la-casa-de-los-espiritus-scaled.jpg', 'https://www.suneo.mx/literatura/subidas/Isabel%20Allende%20La%20Casa%20de%20los%20Esp%C3%ADritus.pdf', 'Español', 'Disponible', 200, 90, 0, NULL),
(165, 'Armados', 'saikomic', NULL, '0000-00-00', '2024-09-25 20:45:37', 0, 'undefined', 'El protagonista de la historia es Estic, joven que sueña con tener aventuras como sus héroes del manga. Un día liberará los poderes ocultos de su yoyo que le otorgará súperpoderes increíbles, una obra que sigue los pasos de grandes referentes del shonen.', '/uploads/3bea172c-e2a9-4402-ad9d-90c853ab6e20.jpg', NULL, 'undefined', '', 20, 0, 1, 'manga'),
(166, 'Cruce de caminos', 'elpepe', '978-950-563-6', '2024-09-11', '2024-09-25 20:48:26', 700, 'dsadsad', 'FKFDJFDSFDS DSFDS FKJDSFD FKSFKDSFKDSFSFSKFSDKJF DSKJDSFDSFDSFDS KFDSFKJSFKFDJFDSFDS DSFDS FKJDSFD FKSFKDSFKDSFSFSKFSDKJF DSKJDSFDSFDSFDS KFDSFKJSFKFDJFDSFDS DSFDS FKJDSFD FKSFKDSFKDSFSFSKFSDKJF DSKJDSFDSFDSFDS KFDSFKJSFKFDJFDSFDS DSFDS FKJDSFD FKSFKDSFKDSFSFSKFSDKJF DSKJDSFDSFDSFDS KFDSFKJSFKFDJFDSFDS DSFDS FKJDSFD FKSFKDSFKDSFSFSKFSDKJF DSKJDSFDSFDSFDS KFDSFKJS', '/uploads/63d15c40-3258-4072-a24b-6ffcd9102e47.webp', 'https://repositorio.uco.edu.co/server/api/core/bitstreams/ef384797-d498-4e8b-94e9-7a80f0496163/content', 'Español', 'Disponible', 7, 0, 0, NULL),
(167, 'Antagonista', 'saikomic', 'undefined', '0000-00-00', '2024-09-26 13:45:34', 0, 'undefined', 'En un mundo regido por el brillo del neón, poder que dota de superhabilidades a los personajes, y en una sociedad custodiada por los Vigilantes, Antagonista irá contra todo y todos para imponer su utopía y acabar la crueldad con crueldad.', '/uploads/e0e53ba5-fcc1-4167-9cab-3759f9e84b6c.jpg', NULL, 'undefined', '', 0, 0, 1, 'manga');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros_autores`
--

CREATE TABLE `libros_autores` (
  `LibroID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros_autores`
--

INSERT INTO `libros_autores` (`LibroID`, `UsuarioID`) VALUES
(165, 10),
(167, 10);

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
(15, 14),
(165, 1),
(165, 5),
(165, 7),
(165, 9),
(165, 11),
(165, 12),
(165, 14),
(166, 1),
(166, 3),
(166, 4),
(167, 1),
(167, 3),
(167, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mangas_capitulos`
--

CREATE TABLE `mangas_capitulos` (
  `CapituloID` int(11) NOT NULL,
  `MangaID` int(11) NOT NULL,
  `CapituloNumero` int(11) NOT NULL,
  `CapituloNombre` varchar(255) NOT NULL,
  `CapituloFecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mangas_capitulos`
--

INSERT INTO `mangas_capitulos` (`CapituloID`, `MangaID`, `CapituloNumero`, `CapituloNombre`, `CapituloFecha`) VALUES
(11, 165, 1, 'El inicio', '2024-09-25 18:24:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mangas_imagenes`
--

CREATE TABLE `mangas_imagenes` (
  `MangaImagenID` int(11) NOT NULL,
  `MangaID` int(11) DEFAULT NULL,
  `CapituloID` int(11) NOT NULL,
  `Imagen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mangas_imagenes`
--

INSERT INTO `mangas_imagenes` (`MangaImagenID`, `MangaID`, `CapituloID`, `Imagen`) VALUES
(6, 165, 11, '/uploads/188d00cf-2645-4a2f-9950-2f45270c7036.jpg'),
(7, 165, 11, '/uploads/4601b34a-b953-4596-92d8-bcada744864f.jpg'),
(8, 165, 11, '/uploads/31c5aad7-806c-4479-8a1a-ae01b9eba761.jpg'),
(9, 165, 11, '/uploads/ba7dafe6-3b7e-48e3-ae59-1e5b5517f836.jpg'),
(10, 165, 11, '/uploads/caf8653c-0495-43f8-86ff-2b50335e5280.jpg'),
(11, 165, 11, '/uploads/3c842333-6814-40ca-ad34-a22f82df42ec.jpg'),
(12, 165, 11, '/uploads/e96b622f-d3c8-4f57-a8be-1263df7c3f4c.jpg'),
(13, 165, 11, '/uploads/fbb33444-3731-4e95-8b53-7a3210b8104d.jpg'),
(14, 165, 11, '/uploads/62dafbdc-78a3-4a75-a469-922cbdb5e3ea.jpg'),
(15, 165, 11, '/uploads/847a763d-ddef-4086-9332-94ad8411b291.jpg');

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
(3, 'admin', 'oww@gmail.com', '/uploads/b8ba20ff-8abe-45a8-9110-cd794c120692.jpg', '$2b$10$ha2A16xWuw0zleP0e2T6qet5jQ85zgSEBNZtIvGywAv9V436JBFE6', 3, 0),
(4, 'exaedro', 'elpepe@gmail.com', '/uploads/2f4adc1f-b3b8-4ea2-88c7-73765823db3b.jpg', '$2b$10$KKSaDN3FgjCqRDuiBLJMT.ivLBqN7wFtZdqxVNZqN.uUq/K1PJhCq', 3, 0),
(7, 'dasasddas', 'dasdas@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$ZaRGgVda.C4ae7TDnNboeeth/6/CV.Bt3/0zVRq/GqoRkWJQBbwzK', 1, 0),
(8, 'holaaa', 'elpopencio123@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$JSQrRWH1MFa8pFZTofdP/.3WBSeSnfsi5IlFYlvUupM9IjsMyB6xa', 1, 0),
(10, 'saikomic', 'saikomic@gmail.com', '/uploads/44698584-e9bc-4e25-9f41-681a3e089c3e.jpg', '$2b$10$R57BEj8zR5n05jSC7ussXuBcFzY4caQItVjO8k47JNqtLv7bBX4aG', 1, 1),
(11, 'NOMELEAS', 'escritor@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$aJqh6omBSdLPbwNTJkR5Q.YKU38ZMSuFzthCgKkk78c2qIV48XeKG', 1, 0),
(12, 'Cuadrilatero', 'owomolo123@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$9pN6v/LqAFsPhq7Pp6OWCuK9eKUfVuCRRnQNs6z.H/X/.GPMztKSe', 1, 1),
(13, 'pruebinha', 'pruebinha@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$MisxZKDgBzlYkh429c4WI.Rj1n.xSc63CpqN9dJID3t7E4i9btV62', 1, 0);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `VisitaID` int(11) NOT NULL,
  `LibroID` int(11) NOT NULL,
  `Pais` varchar(45) DEFAULT NULL,
  `Ip` varchar(45) NOT NULL,
  `Dispositivo` varchar(100) DEFAULT NULL,
  `FechaVisita` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`VisitaID`, `LibroID`, `Pais`, `Ip`, `Dispositivo`, `FechaVisita`) VALUES
(2, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 12:41:05'),
(3, 2, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 12:41:35'),
(4, 4, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 12:41:38'),
(5, 2, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 12:44:44'),
(6, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 13:45:35'),
(7, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:20:22'),
(8, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:20:31'),
(9, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:21:16'),
(10, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:38:03'),
(11, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:38:20'),
(12, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:38:32'),
(13, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:38:41'),
(14, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:39:55'),
(15, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:39:56'),
(16, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:41:46'),
(17, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:42:24'),
(18, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:43:08'),
(19, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:43:45'),
(20, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:44:50'),
(21, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 19:54:29'),
(22, 5, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:38'),
(23, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:40'),
(24, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:42'),
(25, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:43'),
(26, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:44'),
(27, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:45'),
(28, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:45'),
(29, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:46'),
(30, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:16:46'),
(31, 7, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-26 20:17:06'),
(32, 165, NULL, '::ffff:127.0.0.1', NULL, '2024-09-26 23:26:44'),
(33, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:26:42'),
(34, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:26:43'),
(35, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:26:43'),
(36, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:25'),
(37, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:29'),
(38, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:31'),
(39, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:31'),
(40, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:32'),
(41, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:31:32'),
(42, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-27 09:35:18'),
(43, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-30 17:35:24'),
(44, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-09-30 17:37:39'),
(45, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-02 10:43:30'),
(46, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-02 10:51:42'),
(47, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-02 10:54:43'),
(48, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 09:54:36'),
(49, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 09:54:37'),
(50, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 09:54:39'),
(51, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 09:54:42'),
(52, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 10:12:55'),
(53, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 10:13:41'),
(54, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-03 12:25:05'),
(55, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 10:54:10'),
(56, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 10:54:12'),
(57, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 10:54:13'),
(58, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:04:10'),
(59, 1, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:04:24'),
(60, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:04:44'),
(61, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:05:04'),
(62, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:05:28'),
(63, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:05:44'),
(64, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:07:10'),
(65, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:09:05'),
(66, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:09:36'),
(67, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:10:01'),
(68, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:11:40'),
(69, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:11:58'),
(70, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:12:10'),
(71, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:14:32'),
(72, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:15:02'),
(73, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:15:03'),
(74, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:16:09'),
(75, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:18:51'),
(76, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:19:11'),
(77, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:19:13'),
(78, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:23:55'),
(79, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:29:40'),
(80, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:29:46'),
(81, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:31:38'),
(82, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:34:22'),
(83, 167, NULL, '::ffff:127.0.0.1', NULL, '2024-10-04 11:35:05'),
(84, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:35:09'),
(85, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:36:20'),
(86, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:40:56'),
(87, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-04 11:41:13'),
(88, 9, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:42:14'),
(89, 9, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:43:35'),
(90, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:43:37'),
(91, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:45:20'),
(92, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:46:12'),
(93, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:51:00'),
(94, 166, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:51:14'),
(95, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-05 14:51:22'),
(96, 166, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:29:09'),
(97, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:29:12'),
(98, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:29:45'),
(99, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:31:08'),
(100, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:31:20'),
(101, 3, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:34:36'),
(102, 4, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:34:38'),
(103, 5, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 09:34:40'),
(104, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:16:49'),
(105, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:16:57'),
(106, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:34:21'),
(107, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:34:36'),
(108, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:34:58'),
(109, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:35:05'),
(110, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:35:19'),
(111, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:36:04'),
(112, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:38:09'),
(113, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:38:16'),
(114, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:44:07'),
(115, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:44:56'),
(116, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 11:47:39'),
(117, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 13:50:59'),
(118, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 13:52:17'),
(119, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 13:56:29'),
(120, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:18:08'),
(121, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:18:39'),
(122, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:23:32'),
(123, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:24:42'),
(124, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:24:46'),
(125, 167, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:29:04'),
(126, 166, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:29:09'),
(127, 166, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:31:05'),
(128, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:36:51'),
(129, 165, 'Estados Unidos', '8.8.8.8', NULL, '2024-10-09 14:40:29');

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
-- Indices de la tabla `libros_autores`
--
ALTER TABLE `libros_autores`
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- Indices de la tabla `libros_categorias`
--
ALTER TABLE `libros_categorias`
  ADD PRIMARY KEY (`LibroID`,`CategoriaID`),
  ADD KEY `CategoriaID` (`CategoriaID`);

--
-- Indices de la tabla `mangas_capitulos`
--
ALTER TABLE `mangas_capitulos`
  ADD PRIMARY KEY (`CapituloID`),
  ADD KEY `MangaID` (`MangaID`);

--
-- Indices de la tabla `mangas_imagenes`
--
ALTER TABLE `mangas_imagenes`
  ADD PRIMARY KEY (`MangaImagenID`),
  ADD KEY `CapituloID` (`CapituloID`),
  ADD KEY `MangaID` (`MangaID`);

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
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`VisitaID`),
  ADD KEY `LibroID` (`LibroID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autorizaciones`
--
ALTER TABLE `autorizaciones`
  MODIFY `AutorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
  MODIFY `ComentarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `FavoritoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `gustados`
--
ALTER TABLE `gustados`
  MODIFY `GustadoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `HistorialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `LibroID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT de la tabla `mangas_capitulos`
--
ALTER TABLE `mangas_capitulos`
  MODIFY `CapituloID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `mangas_imagenes`
--
ALTER TABLE `mangas_imagenes`
  MODIFY `MangaImagenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `RollID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `ver_mas_tarde`
--
ALTER TABLE `ver_mas_tarde`
  MODIFY `TardeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `VisitaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

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
-- Filtros para la tabla `libros_autores`
--
ALTER TABLE `libros_autores`
  ADD CONSTRAINT `libros_autores_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`),
  ADD CONSTRAINT `libros_autores_ibfk_2` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`UsuarioID`);

--
-- Filtros para la tabla `libros_categorias`
--
ALTER TABLE `libros_categorias`
  ADD CONSTRAINT `libros_categorias_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`) ON DELETE CASCADE,
  ADD CONSTRAINT `libros_categorias_ibfk_2` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`CategoriaID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mangas_capitulos`
--
ALTER TABLE `mangas_capitulos`
  ADD CONSTRAINT `mangas_capitulos_ibfk_1` FOREIGN KEY (`MangaID`) REFERENCES `libros` (`LibroID`);

--
-- Filtros para la tabla `mangas_imagenes`
--
ALTER TABLE `mangas_imagenes`
  ADD CONSTRAINT `mangas_imagenes_ibfk_1` FOREIGN KEY (`MangaID`) REFERENCES `libros` (`LibroID`),
  ADD CONSTRAINT `mangas_imagenes_ibfk_2` FOREIGN KEY (`CapituloID`) REFERENCES `mangas_capitulos` (`CapituloID`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`RollID`) REFERENCES `roles` (`RollID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD CONSTRAINT `visitas_ibfk_1` FOREIGN KEY (`LibroID`) REFERENCES `libros` (`LibroID`);
COMMIT;

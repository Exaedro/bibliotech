-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-09-2024 a las 02:06:42
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `bibliotech_v2`
--

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
  `RollID` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`UsuarioID`, `Nombre`, `CorreoElectronico`, `Imagen`, `Contrasenia`, `RollID`) VALUES
(1, 'dsaasd', 'ow@gmail.com', '	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	', '123', 1),
(2, 'elpepe', 'owomolo123@gmail.com', '	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	', '123', 1),
(3, 'admin', 'oww@gmail.com', 'https://media.licdn.com/dms/image/C4E03AQFJWrmMBqdKfA/profile-displayphoto-shrink_200_200/0/1626754689502?e=2147483647&v=beta&t=dksaF4bLzTKxXlhnfj9SmbEiojTpNl3BKXzWyvh3k1U', '$2b$10$ha2A16xWuw0zleP0e2T6qet5jQ85zgSEBNZtIvGywAv9V436JBFE6', 3),
(4, 'exaedro', 'elpepe@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$KKSaDN3FgjCqRDuiBLJMT.ivLBqN7wFtZdqxVNZqN.uUq/K1PJhCq', 1),
(7, 'dasasddas', 'dasdas@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$ZaRGgVda.C4ae7TDnNboeeth/6/CV.Bt3/0zVRq/GqoRkWJQBbwzK', 1),
(8, 'holaaa', 'elpopencio123@gmail.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', '$2b$10$JSQrRWH1MFa8pFZTofdP/.3WBSeSnfsi5IlFYlvUupM9IjsMyB6xa', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuarioID`),
  ADD KEY `RollID` (`RollID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuarioID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`RollID`) REFERENCES `roles` (`RollID`) ON DELETE CASCADE;
COMMIT;

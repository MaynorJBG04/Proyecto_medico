-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-11-2023 a las 18:41:26
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdapis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamentos`
--

CREATE TABLE `medicamentos` (
  `ID` int(11) NOT NULL,
  `NombreMedicamento` varchar(255) NOT NULL,
  `DosisMedicamento` varchar(50) DEFAULT NULL,
  `Frecuencia` time DEFAULT NULL,
  `DuracionDias` int(11) DEFAULT NULL,
  `ComentarioMedicamento` text DEFAULT NULL,
  `MomentoDia` enum('dia','mediodia','tarde','noche','opcional') DEFAULT NULL,
  `hora_toma` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicamentos`
--

INSERT INTO `medicamentos` (`ID`, `NombreMedicamento`, `DosisMedicamento`, `Frecuencia`, `DuracionDias`, `ComentarioMedicamento`, `MomentoDia`, `hora_toma`) VALUES
(3, 'Metacarbamol ++', '30 mg', '07:00:00', 5, 'Testeo', 'mediodia', '18:25:23'),
(4, 'Ibuprofeno XL', '400 mg', '08:00:00', 3, 'No se, queso', 'noche', '14:28:23'),
(6, 'Naproxeno', '200 mg', '06:00:00', 3, 'Dolores en los huesos', 'mediodia', '14:30:08'),
(9, 'Flexiver', '300 mg', '06:00:00', 4, 'Creo que era un gel', 'tarde', '18:11:27'),
(13, 'Paracetamol', '250 mg', '06:30:00', 3, 'Ninguno', 'opcional', '18:41:49'),
(17, 'Keterolaco', '100 mg', '10:00:00', 365, 'A1N1 Formula 1', 'opcional', '13:31:45'),
(35, 'Fluoxetina V5', '10 mg', '06:00:00', 5, 'Segunda prueba de hora', 'opcional', '11:34:53'),
(45, 'Cerufoxima ++', '200 mg', '15:00:00', 15, 'Prueba de resta sql', 'noche', '02:45:16'),
(46, 'Prueba de medicamento', '500 mg', '06:45:00', 5, 'Postman no jala', 'opcional', '07:09:21'),
(47, 'Naproxeno --', '200 mg', '00:00:00', 6, 'Dolores en los huesos', 'noche', '07:17:20'),
(49, 'NuevoNombre', '300 mg', '12:00:00', 5, 'Actualizado', 'noche', '10:08:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

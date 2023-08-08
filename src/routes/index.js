// Importamos las dependencias.
const express = require('express');
const router = express.Router();

// Importamos las rutas de los usuarios
const userRoutes = require('./userRoutes');
const newsRoutes = require('./newsRoutes');

// Indicamos a express donde estan las rutas de los usuarios y las noticias
router.use(userRoutes);
router.use(newsRoutes);

module.exports = router;

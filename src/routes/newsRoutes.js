const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');

const { newNews } = require('../controllers/news');

// Crear una nueva noticia
router.post('/news', authUser, userExists, newNews);

module.exports = router;

const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');
const newsExists = require('../middlewares/newsExists');

const { newNews, addNewsPhoto } = require('../controllers/news');

// Crear una nueva noticia
router.post('/news', authUser, userExists, newNews);

//Agregar una foto a una entrada existente
router.post('/news/:newsId/photos', authUser, userExists, newsExists, addNewsPhoto);


module.exports = router;

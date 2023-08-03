const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const { authUser, userExists, newsExists, canEdit } = require('../middlewares');

const { newNews, addNewsPhoto, deleteNews } = require('../controllers/news');

// Crear una nueva noticia
router.post('/news', authUser, userExists, newNews);

//Agregar una foto a una entrada existente
router.post(
    '/news/:newsId/photos',
    authUser,
    userExists,
    newsExists,
    canEdit,
    addNewsPhoto
);

// Eliminar una noticia
router.delete(
    '/news/:newsId',
    authUser,
    userExists,
    newsExists,
    canEdit,
    deleteNews
);

module.exports = router;

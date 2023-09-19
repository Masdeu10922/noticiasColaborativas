// Importamos las dependencias.
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const {
    authUser,
    userExists,
    newsExists,
    canEdit,
    authUserOptional,
} = require('../middlewares');

const {
    newNewsController,
    deleteNewsController,
    voteNewsController,
    listNewsController,
    modifyNewsController,
    getNewsController,
    addNewsPhotoController,
} = require('../controllers/news');

// Crear una nueva noticia
router.post('/news', authUser, userExists, newNewsController);

//Agregar una foto a una noticia existente
router.put(
    '/news/:newsId/photos',
    authUser,
    userExists,
    newsExists,
    canEdit,
    addNewsPhotoController
);

// Eliminar una noticia
router.delete(
    '/news/:newsId',
    authUser,
    userExists,
    newsExists,
    canEdit,
    deleteNewsController
);

// Modificar una noticia
router.put(
    '/news/:newsId',
    authUser,
    userExists,
    newsExists,
    canEdit,
    modifyNewsController
);

// Obtener el listado de noticias.
router.get('/news', authUserOptional, listNewsController);

//Vota una noticia existente
router.post(
    '/news/:newsId/votes',
    authUser,
    userExists,
    newsExists,
    voteNewsController
);

// Obtener info de una noticia concreta
router.get('/news/:newsId', authUserOptional, newsExists, getNewsController);

module.exports = router;

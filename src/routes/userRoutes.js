// Importamos las dependencias.
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const { authUser, userExists } = require('../middlewares');

// Importamos las funciones controladoras finales.
const {
    newUserController,
    loginUserController,
    getUserProfileController,
    getOwnUserController,
    editUserPhotoController,
    editUserPassController,
    editUserEmailController,
    editUserBioController,
} = require('../controllers/users');

//Crear un usuario.
router.post('/users/register', newUserController);

// Login de usuario.
router.post('/users/login', loginUserController);

// Obtener perfil público de un usuario.
router.get('/users/:userId', userExists, getUserProfileController);

// Obtener perfil privado de un usuario.
router.get('/users', authUser, userExists, getOwnUserController);

// Editar la foto de un usuario.
router.put('/users/photo', authUser, userExists, editUserPhotoController);

// Editar la contraseña de un usuario.
router.put('/users/password', authUser, userExists, editUserPassController);

// Editar el email de un usuario.
router.put('/users/email', authUser, userExists, editUserEmailController);

// Editar la biografia de un usuario.
router.put('/users/biography', authUser, userExists, editUserBioController);

module.exports = router;

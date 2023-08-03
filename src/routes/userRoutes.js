const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const { authUser, userExists } = require('../middlewares');

const {
    newUser,
    loginUser,
    getUserProfile,
    getOwnUser,
    editUserPhoto,
    editUserPass,
} = require('../controllers/users');

//Crear un usuario.
router.post('/users/register', newUser);

router.post('/users/login', loginUser);

router.get('/users/:userId', userExists, getUserProfile);

router.get('/users', authUser, userExists, getOwnUser);

router.put('/users/photo', authUser, userExists, editUserPhoto);

router.put('/users/password', authUser, userExists, editUserPass);
module.exports = router;

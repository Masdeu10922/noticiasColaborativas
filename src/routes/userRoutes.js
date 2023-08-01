const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const authUser = require('../middlewares/authUser');
const {
    newUser,
    loginUser,
    getUserProfile,
    getOwnUser,
    editUserPhoto,
} = require('../controllers/users');

//Crear un usuario.
router.post('/users/register', newUser);

router.post('/users/login', loginUser);

router.get('/users/:userId', getUserProfile);

router.get('/users', authUser, getOwnUser);

router.put('/users/photo', authUser, editUserPhoto);

module.exports = router;

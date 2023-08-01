const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const newUser = require('../controllers/users/newUser');
const loginUser = require('../controllers/users/loginUser');
const getUserProfile = require('../controllers/users/getUserProfile');
const getOwnUser = require('../controllers/users/getOwnUser');
const authUser = require('../middlewares/authUser');

//Crear un usuario.
router.post('/users/register', newUser);

router.post('/users/login', loginUser);

router.get('/users/:userId', getUserProfile);

router.get('/users', authUser, getOwnUser);

module.exports = router;

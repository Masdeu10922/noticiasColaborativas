const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const newUser = require('../controllers/users/newUser');
const loginUser = require('../controllers/users/loginUser');
const getUserProfile = require('../controllers/users/getUserProfile');

//Crear un usuario.
router.post('/users', newUser);

router.post('/users/login',loginUser );

router.get('/users/:userId', getUserProfile);

module.exports = router;

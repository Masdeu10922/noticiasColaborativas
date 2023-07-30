const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const newUser = require('../controllers/users/newUsers');

//Crear un usuario.
router.post('/users', newUser);

module.exports= router;
const express = require('express');
const router = express.Router();

//Importamos las funciones controladoras necesarias.
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');

module.exports = router;

// Importamos las dependencias.
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

//Importamos las rutas
const routes = require('./src/routes');

// Importamos los errores.
const errorController = require('./src/controllers/errors/errorController');
const notFoundController = require('./src/controllers/errors/notFoundController');

//Creamos el servidor
const app = express();

// Middleware que muestra por consola información sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que evita que las CORS interfieran a la hora de conectar el frontend con
// el backend.
app.use(cors());

//Middelware que "desencripta" un body en formato "raw" creando la propiedad "body" en el objeto "request"
app.use(express.json());

//Middelware que "desencripta" un body en formato "form-data" creando la propiedad "body" y la propiedad "files" en el objeto "request"
app.use(fileUpload());

// defino directorio static
app.use(express.static(process.env.UPLOADS_DIR));

// Middelware que indica a express dónde están las rutas.
app.use(routes);

//Middelware de error.
app.use(errorController);

//Middelware de ruta no enconrada.
app.use(notFoundController);

//Ponemos el servidor a escuchar peticiones en un pueto dado.
app.listen(process.env.PORT, () => {
    console.log(`Serever listening at http://localhost:${process.env.PORT}`);
});

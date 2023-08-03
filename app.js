require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

//Importamos las rutas
const {
    errorController,
    notFoundController,
} = require('./src/controllers/errors');

const routes = require('./src/routes');

//Creamos el servidor
const app = express();

// mid
app.use(morgan('dev'));
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

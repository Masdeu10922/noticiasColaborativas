
require('dotenv').config();

const express = require('express');

//Importamos las rutas
const routes = require('./src/routes/userRoutes');

//Creamos el servidor
const app = express();

//Middelware que "desencripta" un body en formato "raw" creando la propiedad "body" en el objeto "request"
app.use(express.json());

// Middelware que indica a express dónde están las rutas.
app.use(routes);

//Middelware de error.
app.use((err, req, res, next) => {
    res.status(err.httpStatus || 500).send({
        satus: 'error',
        message: 'La ruta especificada no existe',
    });
});

//Middelware de ruta no enconrada.
app.use((req, res) => {
    res.status(404).send({
        satus: 'ok',
        message: 'Ruta no encontrada',
    });
});

//Ponemos el servidor a escuchar peticiones en un pueto dado.
app.listen(process.env.PORT, () => {
    console.log(`Serever listening at http://localhost:${process.env.PORT}`);
});


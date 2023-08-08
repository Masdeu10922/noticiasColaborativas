// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los modelos
const selectNewsByIdModel = require('../models/news/selectNewsByIdModel');

// Importamos los errores
const { unauthorizedUserError } = require('../services/errorService');

const canEdit = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        // Obtenemos el id de la noticia que va a ser editada
        const { newsId } = req.params;

        // Obtenemos los datos de la noticia
        const news = await selectNewsByIdModel(newsId);

        //Si no somos los propietarios lanzamos un error.
        //if (news.userId !== req.user.id) {
        //unauthorizedUserError();
        //}

        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEdit;

// Importamos los modelos
const { checkNewsExists } = require('../models/news/newsExistsModel');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const newsExists = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia de los path params.
        const { newsId } = req.params;

        // Usamos la función del modelo para verificar si la noticia existe.
        const exists = await checkNewsExists(newsId);

        // Lanzamos un error si la noticia no existe
        if (!exists) {
            notFoundError('noticia');
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = newsExists;

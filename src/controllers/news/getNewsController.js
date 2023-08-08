// Importamos los modelos.
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');

// Funcion controladora final que retorna una noticia con un id dado
const getNewsController = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia
        const { newsId } = req.params;

        const news = await selectNewsByIdModel(newsId, req.user?.id);
        res.send({
            status: 'ok',
            data: {
                news,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getNewsController;

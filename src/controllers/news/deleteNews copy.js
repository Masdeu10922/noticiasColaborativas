const deleteNewsModel = require('../../models/news/deleteNewsModel');
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');
// const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');

//const deleteNewsService = require('../../services/deleteNewsService');

const { notFoundError } = require('../../services/errorService');

const deleteNews = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia desde los path params
        const { newsId } = req.params;

        //  Obtenemos los detalles de la noticia
        const news = await selectNewsByIdModel(newsId);

        // Si el id de la noticia no existe lanzamos un error
        if (!news) {
            notFoundError();
        }

        // Borramos la noticia de la base de datos
        await deleteNewsModel(newsId);

        res.send({
            status: 'ok',
            message: 'Noticia eliminada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteNews;

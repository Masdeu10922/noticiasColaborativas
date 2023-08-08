// Importamos los modelos.
const listTopicNewsModel = require('../../models/news/listTopicNewsModel');
const selectAllNewsModel = require('../../models/news/selectAllNewsModel');

// Función controladora final que retorna el listado de noticias.
const listNewsController = async (req, res, next) => {
    try {
        const { topic } = req.query;

        if (topic) {
            const news = await listTopicNewsModel(topic, req.user?.id);
            res.send({
                status: 'ok',
                data: {
                    news,
                },
            });
        } else {
            const news = await selectAllNewsModel(req.users?.id);
            res.send({
                status: 'ok',
                data: {
                    news,
                },
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = listNewsController;

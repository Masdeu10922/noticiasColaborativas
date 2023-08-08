// Importamos los modelos.
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');
const insertVoteModel = require('../../models/news/insertVoteModel');

// Importamos los errores.
const {
    invalidVoteError,
    cannotVoteOwnNewsError,
} = require('../../services/errorService');

// Función controladora final que permite votar una noticia.
const voteNewsController = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const { value } = req.body;

        // Obtenemos los detalles de la noticia.
        const news = await selectNewsByIdModel(newsId);

        //console.log(typeof news.userId, typeof req.user.id, typeof value);
        //console.log(news.userId, req.user.id);

        // Si somos los dueños de la noticia lanzamos un error.
        if (news.userId === req.user.id) {
            cannotVoteOwnNewsError();
        }

        const validVotes = ['0', '1'];

        if (!validVotes.includes(value)) {
            invalidVoteError();
        }

        // Insertamos el voto y obtenemos la nueva media.
        const numVotes = await insertVoteModel(value, newsId, req.user.id);

        res.send({
            status: 'ok',
            data: numVotes,
        });
    } catch (err) {
        next(err);
    }
};
module.exports = voteNewsController;

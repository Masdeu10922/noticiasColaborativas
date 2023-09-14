// Importamos los modelos.
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');
const voteModel = require('../../models/news/voteModel');

// Importamos los errores.
const {
    invalidVoteError,
    cannotVoteOwnNewsError,
} = require('../../services/errorService');

// Función controladora final que permite votar una noticia.
const voteNewsController = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        let { value } = req.body;

        // Obtenemos los detalles de la noticia.
        const news = await selectNewsByIdModel(newsId);

        // Si somos los dueños de la noticia lanzamos un error.
        console.log(news.userId);
        if (news.userId === req.user.id) {
            cannotVoteOwnNewsError();
        }

        const validVotes = ['2', '1'];

        if (!validVotes.includes(value)) {
            invalidVoteError();
        }

        value = parseInt(value);
        console.log('Cambiando el tipo', typeof value);

        // Insertamos el voto.
        const numVotes = await voteModel(value, newsId, req.user.id);

        res.send({
            status: 'ok',
            data: numVotes,
        });
    } catch (err) {
        next(err);
    }
};
module.exports = voteNewsController;

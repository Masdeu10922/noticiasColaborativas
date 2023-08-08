// Importamos los modelos.
const insertNewsModel = require('../../models/news/insertNewsModel');
const insertPhotoModel = require('../../models/news/insertPhotoModel');

// Importamos los errores.
const {
    missingFieldsError,
    invalidTopicError,
} = require('../../services/errorService');
const savePhotoService = require('../../services/savePhotoService');

const validTopics = [
    'ciencia',
    'deportes',
    'cultura',
    'politica',
    'actualidad',
];
const newNewsController = async (req, res, next) => {
    try {
        const { title, intro, text, topic } = req.body;
        if (!title || !intro || !text || !topic) {
            missingFieldsError();
        } else if (!validTopics.includes(topic)) {
            invalidTopicError();
        }
        // Insertamos la noticia
        const newsId = await insertNewsModel(
            title,
            intro,
            text,
            topic,
            req.user.id
        );

        let photoName;

        if (req.files) {
            // Recorremos las fotos
            for (const photo of Object.values(req.files).slice(0, 1)) {
                // Guardamos la foto en el disco
                photoName = await savePhotoService(photo, 500);

                // Insertamos la foto en la noticia
                await insertPhotoModel(photoName, newsId);
            }
        }

        res.send({
            status: 'ok',
            data: {
                news: {
                    id: newsId,
                    title,
                    photoName,
                    intro,
                    text,
                    topic,
                    userId: req.user.id,
                    createAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newNewsController;

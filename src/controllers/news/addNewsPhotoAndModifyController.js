// Importa las dependencias necesarias.
const fs = require('fs/promises');
const path = require('path');
const { missingFieldsError } = require('../../services/errorService');
const savePhotoService = require('../../services/savePhotoService');
const getDb = require('../../db/getDb');
const insertPhotoModel = require('../../models/news/insertPhotoModel');
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');

// Función controladora final que agrega una foto a una noticia y modifica la noticia.
const addNewsPhotoAndModifyController = async (req, res, next) => {
    try {
        // Obtenemos el id de la noticia de los parámetros de la ruta.
        const { newsId } = req.params;

        // Si no hay foto, lanzamos un error.
        if (!req.files?.photo) {
            missingFieldsError();
        }

        // Obtenemos la información de la noticia para comprobar si somos los propietarios.
        const news = await selectNewsByIdModel(newsId);

        // Si la noticia ya tiene una foto, borramos la foto antigua.
        if (news.photo) {
            await fs.rm(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    process.env.UPLOADS_DIR,
                    news.photo
                )
            );
        }

        // Guardamos la foto en la carpeta de subida de archivos.
        const photoName = await savePhotoService(req.files.photo, 500);

        // Modificamos la noticia en la base de datos.
        const { title, intro, text } = req.body;
        const connect = await getDb();

        await connect.query(
            `
                UPDATE news
                SET title=?, intro=?, text=?, photo=?
                WHERE id=?
            `,
            [title, intro, text, photoName, newsId]
        );

        connect.release();

        // Guardamos la foto en la base de datos
        const photoId = await insertPhotoModel(photoName, newsId);

        res.send({
            status: 'ok',
            data: {
                photo: {
                    id: photoId,
                    name: photoName,
                },
                news: {
                    id: newsId,
                    title,
                    intro,
                    text,
                    photo: photoName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = addNewsPhotoAndModifyController;

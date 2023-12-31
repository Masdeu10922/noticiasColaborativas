// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');

// Importamos los modelos.
const insertPhotoModel = require('../../models/news/insertPhotoModel');
const selectNewsByIdModel = require('../../models/news/selectNewsByIdModel');

// Importamos los errores.
const { missingFieldsError } = require('../../services/errorService');
const savePhotoService = require('../../services/savePhotoService');

// Función controladora final que agrega una foto a una noticia.
const addNewsPhotoController = async (req, res, next) => {
    try {
        // Obtenemos el id de al noticia de los path params.
        const { newsId } = req.params;

        // si no hay foto lanzamos un error
        if (!req.files?.photo) {
            missingFieldsError();
        }

        //Obtenemos la información de la noticia para comprobar si somos los propietarios.
        const news = await selectNewsByIdModel(newsId);

        // Si la noticia ya tiene una foto lanzamos un error
        if (news.photo) {
            // borrar la foto antigua enupload
            fs.rm(
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

        //Guardamos la foto en la carpeta de subida de archivos
        const photoName = await savePhotoService(req.files.photo, 500);

        // Guardamos la foto en la base de datos
        const photoId = await insertPhotoModel(photoName, newsId);

        res.send({
            status: 'ok',
            data: {
                photo: {
                    id: photoId,
                    name: photoName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = addNewsPhotoController;

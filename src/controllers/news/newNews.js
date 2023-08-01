const insertNewsModel = require('../../models/news/insertNewsModel');
const { missingFieldsError } = require('../../services/errorService');
const savePhotoService = require('../../services/savePhotoService');

const newNews = async (req, res, next) => {
    try {
        const { title, photo, intro, text, item, userId } = req.body;
        if (!title || !intro || !text || !item) {
            missingFieldsError();
        }
        // Insertamos la noticia
        await insertNewsModel(title, photo, intro, text, item, req.user.id);

        if (req.files) {
            // Recorremos las fotos
            for (const photo of Object.values(req.files).slice(0, 1)){
                // Guardamos la foto en el disco
                const photoName = await savePhotoService(photo, 500);

                // Insertamos la foto en la noticia
                
                    
                };
                Object.values(files);
            }

        }

        res.send({
            status: 'ok',
            message: 'Noticia creada',
        });
    } catch (err) {
        next(err);
    }
};

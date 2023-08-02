const insertPhotoModel = require("../../models/news/insertPhotoModel");
const selectNewsByIdModel = require("../../models/news/selectNewsByIdModel");
const { missingFieldsError, unauthorizedUserError, photoLimitReachedError } = require("../../services/errorService");
const savePhotoService = require("../../services/savePhotoService");

const addNewsPhoto = async (req, res, next) => {
    try {
        // Obtenemos el id de al entrada de los path params.
        const { newsId } = req.params;

        // si no hay foto lanzamos un error
        if (!req.files?.photo) {
            missingFieldsError();
        }

        //Obtenemos la información de la entrada para comprobar si somos los propietarios.
        const news = await selectNewsByIdModel(newsId);
    
        //Si no somos los propietarios lanzamos un error.
        if(news.userId !== Number(req.user.id)){
            unauthorizedUserError();
        }

        // Si la noticia ya tiene una foto lanzamos un error
        if (news.photos.length > 1){
            photoLimitReachedError();
        }

        //Guardamos la foto en la carpeta de subida de archivos
        const photoName = await savePhotoService(req.files.photo, 500)

        // Guardamos la foto en la base de datos
        const photoId = await insertPhotoModel(photoName, newsId)

        res.send({
            status : 'ok',
            data: {
                photo:{
                    id: photoId,
                    name: photoName
                },
            },
        });

    } catch (err) {
        next(err)
    }
}

module.exports = addNewsPhoto;

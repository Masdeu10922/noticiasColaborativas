const selectUserByIdModel = require('../../models/users/selectUserByIdModel ');
const updateUserPhotoModel = require('../../models/users/updateUserPhotoModel');
const deletePhotoService = require('../../services/deletePhotoService');
const { missingFields } = require('../../services/errorService');
const savePhotoService = require('../../services/savePhotoService');

const editUserPhoto = async (req, res, next) => {
    try {
        if (!req.files?.photo) {
            missingFields();
        }

        // Obtenemos los datos del usuario para comprobar si ya tiene una foto
        const user = await selectUserByIdModel(req.user.id);

        // Si el usuario tiene una foto la eliminamos
        if (user.photo) {
            await deletePhotoService(user.photo);
        }
        // Guardamos la foto en la carpeta de subida de archivos
        const photoName = await savePhotoService(req.files.photo, 300);

        // Actualizamos los datos del usuario con el nombre de la foto correspondiente
        await updateUserPhotoModel(photoName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserPhoto;

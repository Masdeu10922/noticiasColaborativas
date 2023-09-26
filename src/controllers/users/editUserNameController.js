// Importa los modelos y otras dependencias si es necesario.

const updateUserNameModel = require('../../models/users/updateUserNameModel copy');

const editUserNameController = async (req, res, next) => {
    try {
        const { userName } = req.body;

        await updateUserNameModel(userName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Nombre de usuario actualizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserNameController;

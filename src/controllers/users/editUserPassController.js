// Importamos los modelos.
const updateUserPassModel = require('../../models/users/updateUserPassModel');

// Importamos los errores.
const { missingFieldsError } = require('../../services/errorService');

const editUserPassController = async (req, res, next) => {
    try {
        const { oldPass, newPass } = req.body;
        if (!oldPass || !newPass) {
            missingFieldsError();
        }

        await updateUserPassModel(oldPass, newPass, req.user.id);

        res.send({
            status: 'ok',
            message: 'Contraseña actulizada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserPassController;

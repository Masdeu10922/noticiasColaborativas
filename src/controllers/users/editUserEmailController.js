// Importamos los modelos.
const updateUserEmailModel = require('../../models/users/updateUserEmailModel');

// Importamos los errores.
const {
    missingFieldsError,
    customError,
} = require('../../services/errorService');

const editUserEmailController = async (req, res, next) => {
    try {
        const { oldEmail, newEmail } = req.body;
        if (!oldEmail || !newEmail) {
            missingFieldsError();
        }
        if (oldEmail === newEmail) {
            // Agrega una validación para verificar que el nuevo correo no sea igual al antiguo
            customError(
                'El nuevo correo electrónico debe ser diferente al antiguo.'
            );
        }

        await updateUserEmailModel(oldEmail, newEmail, req.user.id);

        res.send({
            status: 'ok',
            message: 'Email actulizado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserEmailController;

// Importamos los modelos.
const updateUserEmailModel = require('../../models/users/updateUserEmailModel');

// Importamos los errores.
const { missingFieldsError } = require('../../services/errorService');

const editUserEmailController = async (req, res, next) => {
    try {
        const { oldEmail, newEmail } = req.body;
        if (!oldEmail || !newEmail) {
            missingFieldsError();
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

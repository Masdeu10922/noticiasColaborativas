// Importamos los modelos.
const updateUserBioModel = require('../../models/users/updateUserBioModel');

const editUserBioController = async (req, res, next) => {
    try {
        const { biography } = req.body;

        await updateUserBioModel(biography, req.user.id);

        res.send({
            status: 'ok',
            message: 'Biografia actualizada',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editUserBioController;

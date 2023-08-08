// Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel ');

const getOwnUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(req.user.id);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUserController;

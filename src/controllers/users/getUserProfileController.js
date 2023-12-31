// Importamos los modelos.
const selectUserByIdModel = require('../../models/users/selectUserByIdModel ');

const getUserProfileController = async (req, res, next) => {
    try {
        // Obtenemos el id del usuario de los path params.
        const { userId } = req.params;

        // Obtenemos los datos del usuario.
        const user = await selectUserByIdModel(userId);

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

module.exports = getUserProfileController;

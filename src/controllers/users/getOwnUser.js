const selectUserByIdModel = require('../../models/users/selectUserByIdModel ');

const getOwnUser = async (req, res, next) => {
    try {
        //Obtenemos el id del token.

        //Obtenemos los datos del usuario.
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

module.exports = getOwnUser;

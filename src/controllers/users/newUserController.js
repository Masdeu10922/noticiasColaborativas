// Importamos los modelos.
const insertUserModel = require('../../models/users/insertUserModel');

// Importamos los errores.
const { missingFieldsError } = require('../../services/errorService');

const newUserController = async (req, res, next) => {
    try {
        //obtenemos los datos necesarios del body.
        const { userName, email, password, biography } = req.body;

        // si falta algún campo lanzamos un error.
        if (!userName || !email || !password) {
            missingFieldsError();
        }

        // Inseertamos el usuario.
        await insertUserModel(userName, email, password, biography);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUserController;

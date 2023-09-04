// Importamos los modelos
const { checkUserExists } = require('../models/users/userExistsModel');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const userExists = async (req, res, next) => {
    try {
        // Intentamos obtener el id del usuario
        const userId = req.user?.id || req.params.userId;

        // Usamos la función del modelo para verificar si el usuario existe.
        const exists = await checkUserExists(userId);

        // Lanzamos un error si el usuario no existe
        if (!exists) {
            notFoundError('usuario');
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userExists;

// Importamos las dependencias.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importamos los errores.
const {
    missingFieldsError,
    invalidCredentialsError,
} = require('../../services/errorService');

// Importamos los modelos.
const selectUserByEmailModel = require('../../models/users/selectUserByEmailModel');

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            missingFieldsError();
        }

        const user = await selectUserByEmailModel(email, password);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            invalidCredentialsError();
        }

        //Objeto con información que queremos almacenar en el token
        const tokenInfo = {
            id: user.id,
        };

        //creamos el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        // Logeamos el usuario.
        await selectUserByEmailModel(email, password);

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUserController;

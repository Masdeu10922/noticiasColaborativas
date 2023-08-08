// Importamos las dependencias.
const jwt = require('jsonwebtoken');

// Importamos los errores.
const { invalidCredentialsError } = require('../services/errorService');

const authUserOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {
            let tokenInfo;

            try {
                tokenInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                console.log(err);
                invalidCredentialsError();
            }
            // El token ya se ha desencriptado
            req.user = tokenInfo;
        }
        //pasamos el control de la función a la siguiente controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUserOptional;

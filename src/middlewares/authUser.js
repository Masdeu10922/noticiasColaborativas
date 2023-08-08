// Importamos las dependencias.
const jwt = require('jsonwebtoken');

// Importamos los errores.
const {
    notAuthenticationError,
    invalidCredentialsError,
} = require('../services/errorService');

const authUser = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            notAuthenticationError();
        }
        //Variable que almacenará la info del token
        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.log(err);
            invalidCredentialsError();
        }
        // El token ya se ha desencriptado
        req.user = tokenInfo;

        //pasamos el control de la función a la siguiente controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;

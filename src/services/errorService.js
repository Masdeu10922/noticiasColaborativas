module.exports = {
    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409,
            code: 'EMAIL_ALREADY_REGISTERED',
            message: 'El email ya está registrado',
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401,
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales invalidas',
        };
    },
    missingFields() {
        throw {
            httpStatus: 400,
            code: 'MISSING_FIELDS',
            message: 'Faltan campos',
        };
    },

    notAuthenticationError() {
        throw {
            httpStatus: 401,
            code: 'NOT_AUTHENTICATED',
            message: `Debes enviar un token en el header'Autorizacion'`,
        };
    },

    notFoundError() {
        throw {
            httpStatus: 404,
            code: 'RESOURCE_NOT_FOUND',
            message: 'El recurso requerido no existe',
        };
    },
    userAlreadyRegisteredError() {
        throw {
            httpStatus: 409,
            code: 'USER_ALREADY_REGISTERED',
            message: 'El nombre de usuario ya está registrado',
        };
    },

    invalidTokenError() {
        throw {
            httpStatus: 401,
            code: 'INVALID_TOKEN',
            message: 'Token invalido',
        };
    },
};

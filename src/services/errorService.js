module.exports = {
    emailAlreadyRegisteredError() {
        throw {
            httpStatus: 409,
            code: 'EMAIL_ALREADY_REGISTERED',
            message: 'El email ya está registrado',
        };
    },
    deleteFileError() {
        throw {
            httpStatus: 409,
            code: 'FILE_DELETE_FAILED',
            message: 'Error al eliminar el archivo del disco',
        };
    },
    invalidCredentialsError() {
        throw {
            httpStatus: 401,
            code: 'INVALID_CREDENTIALS',
            message: 'Credenciales invalidas',
        };
    },
    missingFieldsError() {
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
    saveFileError() {
        throw {
            httpStatus: 500,
            code: 'FILE_SAVED_FILED',
            message: 'Error al guardar el archivo en el disco',
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

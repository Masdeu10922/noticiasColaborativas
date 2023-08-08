module.exports = {
    invalidVoteError() {
        throw {
            httpStatus: 400,
            code: 'INVALID_VOTE',
            message: 'Voto no valido solo se puede votar con 0 o 1',
        };
    },

    cannotVoteOwnNewsError() {
        throw {
            httpStatus: 403,
            code: 'CANNOT_VOTE_OWN_NEWS',
            message: 'No puedes votar tu propia noticia',
        };
    },

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
    invalidTopicError() {
        throw {
            httpStatus: 409,
            code: 'INVALID_TOPIC',
            message:
                'Tema no valido, los temas validos son: ciencia, deportes, cultura, politica, actualidad',
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

    notFoundError(resource) {
        throw {
            httpStatus: 404,
            code: 'RESOURCE_NOT_FOUND',
            message: `El recurso '${resource}' requerido no existe`,
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

    unauthorizedUserError() {
        throw {
            httpStatus: 409,
            code: 'UNAUTHORIZED',
            message: 'El usuario no esta autorizado para hacer esta operación',
        };
    },

    photoLimitReachedError() {
        throw {
            httpStatus: 409,
            code: 'PHOTO_LIMIT_REACHED',
            message: 'Solo se puede añadir una foto a la noticia.',
        };
    },
    voteAlreadyExistsError() {
        throw {
            httpStatus: 409, // Conflict
            code: 'VOTE_ALREADY_EXISTS',
            message: 'No se puede votar más de una vez la misma noticia',
        };
    },
};

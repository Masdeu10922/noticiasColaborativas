const getDb = require('../../db/getDb');
const { notFoundError } = require('../../services/errorService');

const selectUserByIdModel = async (useruId) => {
    let connection;
    try {
        connection = await getDb();
        // Comprobamos si hay algún usuario con el email proporcionado
        const [users] = await connection.query(
            'SELECT uid, username, photo, biography, createdAt FROM users WHERE uId =?',
            [useruId]
        );

        // Si no existe un usuario con ese email lanzamos un error
        if (users.length < 1) {
            notFoundError();
        }
        // El array de usuarios solo podrá conrtener un unico usuario dado que el email no puede repetirse. Retornamos el usuario que se encuentra en la posición 0.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;

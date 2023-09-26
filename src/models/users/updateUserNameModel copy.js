// Importa la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const updateUserNameModel = async (userName, userId) => {
    let connection;

    try {
        connection = await getDb();
        // Actualiza el nombre de usuario
        await connection.query(`UPDATE users SET userName = ? WHERE id = ?`, [
            userName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserNameModel;

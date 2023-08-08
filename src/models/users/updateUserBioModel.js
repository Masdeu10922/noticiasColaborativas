// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const updateUserBioModel = async (biography, userId) => {
    let connection;

    try {
        connection = await getDb();
        // obtenemos la biografia actual
        const [users] = await connection.query(
            `SELECT biography FROM users WHERE id = ?`,
            [userId]
        );

        // Actualizamos el email del usuario
        await connection.query(`UPDATE users SET biography = ? WHERE id = ?`, [
            biography,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserBioModel;

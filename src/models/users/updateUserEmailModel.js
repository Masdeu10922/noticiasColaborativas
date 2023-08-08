// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const updateUserEmailModel = async (oldEmail, newEmail, userId) => {
    let connection;

    try {
        connection = await getDb();
        // obtenemos el email actual
        const [users] = await connection.query(
            `SELECT email FROM users WHERE id = ?`,
            [userId]
        );

        // Actualizamos el email del usuario
        await connection.query(`UPDATE users SET email = ? WHERE id = ?`, [
            newEmail,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserEmailModel;

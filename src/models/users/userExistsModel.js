// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

async function checkUserExists(userId) {
    const connection = await getDb();
    const [users] = await connection.query(
        `SELECT id FROM users WHERE id = ?`,
        [userId]
    );
    connection.release();

    return users.length > 0;
}

module.exports = {
    checkUserExists,
};

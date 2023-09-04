// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

async function checkNewsExists(newsId) {
    const connection = await getDb();
    const [news] = await connection.query(`SELECT id FROM news WHERE id = ?`, [
        newsId,
    ]);
    connection.release();

    return news.length > 0;
}

module.exports = {
    checkNewsExists,
};

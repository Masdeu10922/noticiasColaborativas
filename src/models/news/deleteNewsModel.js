// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const deleteNewsControllerModel = async (newsId) => {
    let connection;
    try {
        connection = await getDb();

        // Eliminamos la noticia
        await connection.query(`DELETE FROM news WHERE id =?`, [newsId]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNewsControllerModel;

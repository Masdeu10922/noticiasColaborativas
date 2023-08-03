const getDb = require('../../db/getDb');

const deleteNewsModel = async (newsId) => {
    let connection;
    try {
        connection = await getDb();

        // Eliminamos la noticia
        await connection.query(`DELETE FROM news WHERE id =?`, [newsId]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteNewsModel;

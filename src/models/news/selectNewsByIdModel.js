const getDb = require('../../db/getDb');

const selectNewsByIdModel = async (newsId) => {
    let connection;
    try {
        connection = await getDb();

        // Obtenemos la información necesaria de la enrtada.
        const [news] = await connection.query(
            `SELECT userId FROM news WHERE id = ?`,
            [newsId]
        );

        const photos = await connection.query(
            `SELECT photo FROM news WHERE id = ?`,
            [newsId]
        )


            return {
                ...news[0],
                photos,
            };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectNewsByIdModel;

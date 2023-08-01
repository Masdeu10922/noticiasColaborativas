const getDb = require('../../db/getDb');

const insertNewsModel = async (title, photo, intro, text, item, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos la noticia
        await connection.query(
            `INSERT INTO news(title, photo, intro, text, item, userId) VALUES(?,?,?,?,?,?)`,
            [title, photo, intro, text, item, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNewsModel;

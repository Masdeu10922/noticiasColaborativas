const uuid = require('uuid');
const getDb = require('../../db/getDb');

const insertNewsModel = async (title, intro, text, topic, userId) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos la noticia
        const [news] = await connection.query(
            `INSERT INTO news(title, intro, text, topic, userId) VALUES(?,?,?,?,?)`,
            [title, intro, text, topic, userId]
        );

        // Retornamos el id que la base de datos ha asignado a esta noticia
        return news.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNewsModel;

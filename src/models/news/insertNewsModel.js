const getDb = require('../../db/getDb');

const insertNewsModel = async (title, photo, intro, text, item, userId) => {
    let connection;
    try {
        connection = await getDb();
        console.log('aaaaaaaaa');
        // Insertamos la noticia
        const [news] = await connection.query(
            `INSERT INTO news(title, photo, intro, text, item, userId) VALUES(?,?,?,?,?,?)`,
            [title, photo, intro, text, item, userId]
        );

        // Retornamos el id que la base de datos ha asignado a esta noticia
        return news.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNewsModel;

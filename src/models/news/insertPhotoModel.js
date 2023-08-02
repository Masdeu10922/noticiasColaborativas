const getDb = require('../../db/getDb');

const insertPhotoModel = async (photoName, newsId) => {
    let connection;
    try {
        connection = await getDb();

        // Insertamos la foto
        await connection.query(`UPDATE news SET photo = ? WHERE id = ?`, [
            photoName,
            newsId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPhotoModel;

//UPDATE users SET photo = ? WHERE id = ?
//INSERT INTO news(photo, newsId) VALUES(?,?)

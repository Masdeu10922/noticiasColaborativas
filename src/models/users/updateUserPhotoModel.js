const getDb = require('../../db/getDb');
const updateUserPhotoModel = async (photoName, userId) => {
    let connection;
    try {
        connection = await getDb();
        await connection.query(`UPDATE users SET photo = ? WHERE id = ?`, [
            photoName,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPhotoModel;

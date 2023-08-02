const getDb = require('../../db/getDb');


const selectUserByIdModel = async (userId) => {
    let connection;
    try {
        connection = await getDb();
        // Comprobamos si hay algún usuario con el id proporcionado
        const [users] = await connection.query(
            `SELECT id, username, email, photo, biography, createdAt FROM users WHERE id = ?`,
            [userId]
        );

        // El array de usuarios solo podrá conrtener un unico usuario dado que el email no puede repetirse. Retornamos el usuario que se encuentra en la posición 0.
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;

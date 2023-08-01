const getDb = require('../db/getDb');
const { notFoundError } = require('../services/errorService');

const userExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [req.user.id]
        );
        // Lanzamos un error si el usuario no existe
        if (users.length < 1) {
            notFoundError();
        }
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;

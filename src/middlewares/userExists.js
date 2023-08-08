// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../db/getDb');

// Importamos los errores.
const { notFoundError } = require('../services/errorService');

const userExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        // Intentamos obtener el id del usuario
        const userId = req.user?.id || req.params.userId;

        const [users] = await connection.query(
            `SELECT id FROM users WHERE id = ?`,
            [userId]
        );

        // Lanzamos un error si el usuario no existe
        if (users.length < 1) {
            notFoundError('usuario');
        }
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = userExists;

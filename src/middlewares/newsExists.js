const getDb = require('../db/getDb');
const { notFoundError } = require('../services/errorService');

const newsExists = async (req, res, next) => {
    let connection;
    try {
        connection = await getDb();

        //Obtenemos el id d ela entrada de los path params.
        const { newsId } = req.params;

        const [news] = await connection.query(
            `SELECT id FROM news WHERE id = ?`,
            [newsId]
        );

        // Lanzamos un error si el usuario no existe
        if (news.length < 1) {
            notFoundError();
        }
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newsExists;

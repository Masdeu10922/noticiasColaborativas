// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectAllNewsModel = async (keyword = '', userId = '', date = '') => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el listado de noticias.
        const [news] = await connection.query(
            `SELECT 
                N.id,
                N.title,
                N.topic,
                N.photo,
                U.userName,
                IFNULL(SUM(v.value = 1), 0) AS vPos,
				IFNULL(SUM(CASE WHEN v.value = 0 THEN 1 ELSE 0 END), 0) AS vNeg,
                N.createdAt AS date
            FROM news N
            LEFT JOIN votes V ON V.newsId = N.id
            INNER JOIN users U ON U.id = N.userId
            WHERE N.title LIKE ? OR N.topic LIKE ? OR N.text LIKE ? 
            GROUP BY N.id, date
            ORDER BY date DESC
            `,
            [
                userId,
                userId,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                date,
            ]
        );

        news.votes = Number(news.votes);

        return news;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllNewsModel;

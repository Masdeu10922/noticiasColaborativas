// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectAllNewsModel = async (userId = '', keyword = '') => {
    let connection;

    try {
        connection = await getDb();

        // Obtenemos el listado de noticias.
        const [news] = await connection.query(
            `SELECT 
                N.id,
                N.title,
                N.intro,
                N.topic,
                N.photo,
                U.userName,
                IFNULL(SUM(V.value = 1), 0) AS vPositive,
				IFNULL(SUM(CASE WHEN V.value = 0 THEN 1 ELSE 0 END), 0) AS vNegative,
                N.createdAt AS date
            FROM news N
            LEFT JOIN votes V ON V.newsId = N.id
            INNER JOIN users U ON U.id = N.userId
            WHERE N.title LIKE ? OR N.topic LIKE ? OR N.text LIKE ? 
            GROUP BY N.id, date
            ORDER BY date DESC
            `,
            [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
        );

        news.votes = Number(news.votes);

        return news;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllNewsModel;

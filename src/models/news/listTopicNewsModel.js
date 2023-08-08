// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const listTopicNewsModel = async (topic, userId = '') => {
    let connection;
    try {
        connection = await getDb();

        // Obtenemos la información necesaria de la noticia.
        const [news] = await connection.query(
            `SELECT 
                N.id,
                N.title,
                N.topic,
                N.photo,
                IFNULL(SUM(v.value = 1), 0) AS vPos,
				IFNULL(SUM(CASE WHEN v.value = 0 THEN 1 ELSE 0 END), 0) AS vNeg,
                N.createdAt as date
            FROM news N
            LEFT JOIN votes AS V ON V.newsId=N.id
            WHERE N.topic = ? 
            GROUP BY N.id
            ORDER BY date DESC
            `,
            [topic]
        );

        return news;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listTopicNewsModel;

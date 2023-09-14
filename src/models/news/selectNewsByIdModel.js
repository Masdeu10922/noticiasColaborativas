// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectNewsByIdModel = async (newsId, userId = '') => {
    let connection;
    try {
        connection = await getDb();

        // Obtenemos la información necesaria de la noticia junto con los votos positivos y negativos.
        const [news] = await connection.query(
            `SELECT 
                N.id,
                N.title,
                N.intro,
                N.topic,
                N.photo,
                N.text,
                U.userName,
                BIT_OR(V.userId = ?) AS votedByMe,
                SUM(CASE WHEN V.value = 1 THEN 1 ELSE 0 END) AS vPos,
                SUM(CASE WHEN V.value = 2 THEN 1 ELSE 0 END) AS vNeg,
                N.createdAt as date,
                N.userId
            FROM news N
            LEFT JOIN votes V ON V.newsId = N.id
            INNER JOIN users U ON U.id = N.userId
            WHERE N.id = ? 
            GROUP BY N.id
            ORDER BY date DESC
            `,
            [userId, newsId]
        );

        // Construimos el objeto de la noticia con la información de los votos positivos y negativos incluidos.
        const newsWithVotes = {
            id: news[0].id,
            title: news[0].title,
            intro: news[0].intro,
            topic: news[0].topic,
            photo: news[0].photo,
            text: news[0].text,
            userName: news[0].userName,
            date: news[0].date,
            userId: news[0].userId,
            votedByMe: news[0].votedByMe,
            vPositive: news[0].vPos,
            vNegative: news[0].vNeg,
        };

        return newsWithVotes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectNewsByIdModel;

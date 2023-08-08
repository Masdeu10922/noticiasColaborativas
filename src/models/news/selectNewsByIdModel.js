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
                N.topic,
                N.photo,
                U.userName,
                BIT_OR(V.userId = ?) AS votedByMe,
                SUM(CASE WHEN V.value = 1 THEN 1 ELSE 0 END) AS vPos,
                SUM(CASE WHEN V.value = 0 THEN 1 ELSE 0 END) AS vNeg,
                AVG(IFNULL(V.value, 0)) AS vote,
                N.createdAt as date,
                N.userId
            FROM news N
            LEFT JOIN votes V ON V.newsId = N.id
            INNER JOIN users U ON U.id = N.userId
            WHERE N.id = ? 
            GROUP BY N.id
            ORDER BY date DESC, vote DESC
            `,
            [userId, newsId]
        );

        // Construimos el objeto de la noticia con la información de los votos positivos y negativos incluidos.
        const newsWithVotes = {
            id: news[0].id,
            title: news[0].title,
            topic: news[0].topic,
            photo: news[0].photo,
            userName: news[0].userName,
            votedByMe: news[0].votedByMe,
            votes: {
                positive: news[0].vPos,
                negative: news[0].vNeg,
                total: news[0].vPos - news[0].vNeg,
            },
            vote: news[0].vote,
            date: news[0].date,
            userId: news[0].userId,
        };

        return newsWithVotes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectNewsByIdModel;

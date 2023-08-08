// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectUserByIdModel = async (userId) => {
    let connection;
    try {
        connection = await getDb();
        // Comprobamos si hay algún usuario con el id proporcionado, y también seleccionamos las noticias creadas por ese usuario.
        const [users] = await connection.query(
            `SELECT u.id AS user_id, u.username, u.photo AS user_photo, u.biography, u.createdAt AS user_createdAt,
            n.id AS news_id, n.title, n.photo AS news_photo, n.intro, n.text, n.topic, n.createdAt AS news_createdAt,
            SUM(CASE WHEN v.value = 1 THEN 1 ELSE 0 END) AS vPos,
            SUM(CASE WHEN v.value = 0 THEN 1 ELSE 0 END) AS vNeg
            FROM users u
            LEFT JOIN news n ON u.id = n.userId
            LEFT JOIN votes v ON n.id = v.newsId
            WHERE u.id = ?
            GROUP BY n.id
            ORDER BY vPos DESC`,
            [userId]
        );
        let user = null;
        if (users.length > 0) {
            //Construimos el objeto de usuario y las noticias relacionadas.
            user = {
                id: users[0].user_id,
                username: users[0].username,
                email: users[0].email,
                photo: users[0].user_photo,
                biography: users[0].biography,
                createdAt: users[0].user_createdAt,
                news: users.map((row) => ({
                    id: row.news_id,
                    title: row.title,
                    photo: row.news_photo,
                    intro: row.intro,
                    text: row.text,
                    topic: row.topic,
                    createdAt: row.news_createdAt,
                    votes: {
                        positivos: row.vPos,
                        negativos: row.vNeg,
                    },
                })),
            };
        }
        return user;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdModel;

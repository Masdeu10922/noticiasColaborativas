// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const selectUserByIdModel = async (userId) => {
    let connection;
    try {
        connection = await getDb();
        const [users] = await connection.query(
            `SELECT u.id AS user_id, u.username, u.photo AS user_photo, u.email, u.biography, u.createdAt AS user_createdAt
            FROM users u
            WHERE u.id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return null; // El usuario no existe
        }

        // Construir el objeto de usuario sin noticias por defecto
        const user = {
            id: users[0].user_id,
            username: users[0].username,
            email: users[0].email,
            photo: users[0].user_photo,
            biography: users[0].biography,
            createdAt: users[0].user_createdAt,
            news: [], // Inicialmente, no hay noticias
        };

        // Verificar si el usuario tiene noticias relacionadas
        const [userNews] = await connection.query(
            `SELECT n.id AS news_id, n.title, n.photo AS news_photo, n.intro, n.text, n.topic, n.createdAt AS news_createdAt,
            SUM(CASE WHEN v.value = 1 THEN 1 ELSE 0 END) AS vPos,
            SUM(CASE WHEN v.value = 0 THEN 1 ELSE 0 END) AS vNeg
            FROM news n
            LEFT JOIN votes v ON n.id = v.newsId
            WHERE n.userId = ?
            GROUP BY n.id
            ORDER BY vPos DESC`,
            [userId]
        );

        if (userNews.length > 0) {
            // Si el usuario tiene noticias, construir el objeto de noticias
            user.news = userNews.map((row) => ({
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
            }));
        }

        return user;
    } finally {
        if (connection) connection.release();
    }
};
module.exports = selectUserByIdModel;

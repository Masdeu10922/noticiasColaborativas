// Importamos las dependencias.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { voteAlreadyExistsError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para votar una noticia.
const insertVoteModel = async (value, newsId, userId) => {
    let connection;
    try {
        connection = await getDb();
        // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
        const [votes] = await connection.query(
            `SELECT id FROM votes WHERE newsId = ? AND userId = ?`,
            [newsId, userId]
        );
        // Si la longitud del array de votos es mayor que cero, lanzamos un error indicando que la noticia ya ha sido votada por este usuario.
        if (votes.length > 0) {
            voteAlreadyExistsError();
        }
        // Insertamos el voto usando el valor entero (intValue) en lugar de la cadena.
        await connection.query(
            `INSERT INTO votes(value, newsId, userId) VALUES (?, ?, ?)`,
            [value, newsId, userId]
        );

        const [outPos] = await connection.query(
            `
            SELECT count(value) AS vPos 
            FROM votes 
            WHERE newsId = ? AND value = 1`,
            [newsId]
        );

        const [outNeg] = await connection.query(
            `
            SELECT count(value) AS vNeg 
            FROM votes 
            WHERE newsId = ? AND value = 0`,
            [newsId]
        );

        return {
            vPos: outPos[0].vPos,
            vNeg: outNeg[0].vNeg,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteModel;

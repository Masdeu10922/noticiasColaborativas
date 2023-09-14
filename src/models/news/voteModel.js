// Importamos las dependencias.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { voteAlreadyExistsError } = require('../../services/errorService');

// Función que realiza una consulta a la base de datos para votar una noticia.
const voteModel = async (value, newsId, userId) => {
    let connection;
    try {
        connection = await getDb();
        // Comprobamos si ya existe un voto previo por parte del usuario que está intentando votar.
        const [votes] = await connection.query(
            `SELECT id, value FROM votes WHERE newsId = ? AND userId = ?`,
            [newsId, userId]
        );

        console.log('a', votes[0]);

        // Si la longitud del array de votos es mayor que cero, lanzamos un error indicando que la noticia ya ha sido votada por este usuario.
        if (votes[0]) {
            console.log('Comprobando si hay valor', votes[0]);
        }
        if (votes[0]?.value) {
            console.log(
                'Comprobando si hay valor y coincide',
                typeof votes[0].value,
                '=',
                typeof value
            );
            console.log(value);
            if (votes[0].value === value) {
                console.log('Coincide el valor');
                await connection.query(
                    `DELETE FROM votes WHERE id = ?`,
                    votes[0].id
                );
            } else {
                console.log('No coincide el valor');
                await connection.query(
                    `UPDATE votes SET value = ? WHERE id = ?`,
                    [value, votes[0].id]
                );
            }
        } else {
            console.log('No lo haba votado');
            // Insertamos el voto usando el valor entero (intValue) en lugar de la cadena.
            await connection.query(
                `INSERT INTO votes(value, newsId, userId) VALUES (?, ?, ?)`,
                [value, newsId, userId]
            );
        }

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
            WHERE newsId = ? AND value = 2`,
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

module.exports = voteModel;
////

const getDb = require('../../db/getDb');
const { voteAlreadyExistError } = require('../../services/errorService');

const insertVoteModel = async (value, newsId, userId) => {
    let connection;

    try {
        connection = await getDb();
        const [votes] = await connection.query(
            `SELECT id FROM votes WHERE userId =? AND newsId =? `,
            [userId, newsId]
        );
        if (votes.length > 0) {
            voteAlreadyExistError();
        }

        await connection.query(
            `INSERT INTO votes (value, newsId, userId) VALUES (?,?,?)`,
            [value, newsId, userId]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteModel;

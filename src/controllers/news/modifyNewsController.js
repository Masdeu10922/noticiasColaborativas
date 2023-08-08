// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Función controladora final que modifica una noticia.
const modifyNewsController = async (req, res) => {
    try {
        const connect = await getDb();

        const { newsId } = req.params;
        const { title, intro, text } = req.body;

        await connect.query(
            `
                UPDATE news
                SET title=?, intro=?, text=?
                WHERE id=?
            `,
            [title, intro, text, newsId]
        );

        const [modifyNewsController] = await connect.query(
            `
                SELECT * FROM news WHERE id=?
            `,
            [newsId]
        );

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: 'noticia modificada correctamente',
            data: modifyNewsController,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = modifyNewsController;

const getDB = require('../../db/getDb');
const deletePhotoService = require('../../services/deletePhotoService');

const deleteNews = async (req, res) => {
    try {
        const connect = await getDB();
        const { newsId } = req.params;

        //seleccionar las fotos asociadas a la entrada
        const [photos] = await connect.query(
            `
                SELECT photo
                FROM news
                WHERE id=?
            `,
            [newsId]
        );

        //borro las fotos de la entrada en la tabla photos
        await connect.query(`DELETE FROM news WHERE id=?`, [newsId]);

        //elimino las fotos de la carpeta uploads/photoentries
        for (let item of photos) {
            await deletePhotoService(item.photo, process.env.UPLOADS_DIR);
        }

        //borro los posibles votos que tenga esa entrada
        await connect.query(
            `
                DELETE FROM votes WHERE newsId=?
            `,
            [newsId]
        );

        //elimino la entrada
        await connect.query(`DELETE FROM news WHERE id=?`, [newsId]);

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: `La entrada con id ${newsId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteNews;

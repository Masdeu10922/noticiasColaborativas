// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los servicios.
const deletePhotoService = require('../../services/deletePhotoService');

// Función controladora final que agrega una foto a una noticia.
const deleteNewsController = async (req, res) => {
    try {
        const connect = await getDb();
        const { newsId } = req.params;

        // Eliminar los posibles votos que tenga esa noticia
        await connect.query(
            `
                DELETE FROM votes WHERE newsId=?
            `,
            [newsId]
        );

        //seleccionar las fotos asociadas a la noticia
        const [photos] = await connect.query(
            `
                SELECT photo
                FROM news
                WHERE id=?
            `,
            [newsId]
        );

        //borro las fotos de la noticia en la tabla photos
        await connect.query(`DELETE FROM news WHERE id=?`, [newsId]);

        //elimino las fotos de la carpeta uploads
        for (let item of photos) {
            if (item.photo) {
                await deletePhotoService(item.photo, process.env.UPLOADS_DIR);
            }
        }

        connect.release();

        res.status(200).send({
            status: 'OK',
            message: `La noticia con id ${newsId} y todos sus elementos fueron eliminados`,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = deleteNewsController;

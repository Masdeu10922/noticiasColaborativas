const fs = require('fs/promises');
const path = require('path');
const { deleteFileError } = require('./errorService');

const deletePhotoService = async (imgName) => {
    try {
        // Ruta absoluta al archivo que queremos eliminar
        const imgPath = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR,
            imgName
        );
        // Comprobamos si la imagen existe
        try {
            await fs.access(imgPath);
        } catch {
            return;
        }

        // Eliminamos el archivo de la carpeta de subida de archivos
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        deleteFileError();
    }
};

module.exports = deletePhotoService;

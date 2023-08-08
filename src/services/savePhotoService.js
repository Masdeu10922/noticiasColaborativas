// Importamos las dependencias.
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

// Importamos los errores.
const { saveFileError } = require('./errorService');

const savePhotoService = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos
        const uploadsDir = path.join(
            __dirname,
            '..',
            '..',
            process.env.UPLOADS_DIR
        );
        // Creamos la carpeta "uploads" si no existe
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // creamos un objeto de tipo sharp con la imagen recibida
        const sharpImg = sharp(img.data);

        // Redimensionamos la imagen
        sharpImg.resize(width);

        // Generamos un nombre unico para la imagen
        const imgName = `${uuid.v4()}.jpg`;

        // Ruta absoluta a la imagen
        const imgPath = path.join(uploadsDir, imgName);

        // Guardamos la imagen en la carpeta indicada
        await sharpImg.toFile(imgPath);

        // Retornamos el nombre con el que hemos guardado la imagen
        return imgName;
    } catch (err) {
        console.error(err);
        saveFileError();
    }
};

module.exports = savePhotoService;

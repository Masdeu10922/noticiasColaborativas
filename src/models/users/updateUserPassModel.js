// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

const { invalidCredentialsError } = require('../../services/errorService');

const updateUserPassModel = async (oldPass, newPass, userId) => {
    let connection;

    try {
        connection = await getDb();
        // obtenemos la contraseña actual
        const [users] = await connection.query(
            `SELECT password FROM users WHERE id = ?`,
            [userId]
        );

        // comprobamos si la contraseña vieja coincide con la actual
        const validPass = await bcrypt.compare(oldPass, users[0].password);

        // Si las contraseñas no coinciden lanzamos un error
        if (!validPass) {
            invalidCredentialsError();
        }

        // Encriptamos la nueva contraseña
        const hashedPass = await bcrypt.hash(newPass, 10);

        // Actualizamos el usuario
        await connection.query(`UPDATE users SET password = ? WHERE id = ?`, [
            hashedPass,
            userId,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateUserPassModel;

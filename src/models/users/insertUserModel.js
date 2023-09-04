// Importamos las dependencias.
const bcrypt = require('bcrypt');

// Importamos la función que devuelve una conexión con la base de datos.
const getDb = require('../../db/getDb');

// Importamos los errores.
const { emailAlreadyRegisteredError } = require('../../services/errorService');

const insertUserModel = async (userName, email, password, biography) => {
    let connection;

    try {
        connection = await getDb();

        // Buscamos en la base de datos algún usuario con ese email.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        //Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            emailAlreadyRegisteredError();
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        //Insertamos el usuario.
        await connection.query(
            `INSERT INTO users(userName, email, password, biography) VALUES(?, ?, ?, ?)`,
            [userName, email, hashedPass, biography]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;

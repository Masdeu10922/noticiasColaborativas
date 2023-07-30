const bcrypt = require('bcrypt');

const getDb = require('../../db/getDb');

const insertUserModel = async (firstName, lastName,  email, password, photo, biography) => {
    let connection;

    try {
        connection = await getDb();

        // Buscamos en la base de datos algún usuario con ese email.
        let [users] = await connection.query(
            `SELECT id FROM users WHERE email = ?`,
            [email]
        );

        //Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0){
            const err = new Error('Ya existe un usuario con este email');
            err.hhtpStatus = 409;
            throw err;
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        //Insertamos el usuario.
        await connection.query(
            `INSERT INTO users(firstName, lastName,  email, password, photo, biography) VALUES(?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, email, hashedPass, photo, biography]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserModel;
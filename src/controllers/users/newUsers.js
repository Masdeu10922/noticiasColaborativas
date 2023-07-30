const insertUserModel = require('../../models/users/insertUserModel');

const newUser = async (req, res, next) => {
    try{
        //obtenemos los datos necesarios del body.
        const {firstName, lastName,  email, password, photo, biography} = req.body;

        // si falta algún campo lanzamos un error.
        if(!firstName || !lastName || !email || !password || !biography ) {
            const err = new Error('Faltan campos por rellenar');
            err.httpStatus = 400;
            throw err;
        }

        // Inseertamos el usuario.
        await insertUserModel(firstName, lastName,  email, password, photo, biography);

        res.send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = newUser;
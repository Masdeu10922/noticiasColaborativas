const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    missingFields,
    invalidCredentialsError,
} = require('../../services/errorService');
const selectUserByEmailModel = require('..//..//models/users/selectUserByEmailModel');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            missingFields();
        }

        const user = await selectUserByEmailModel(email, password);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            invalidCredentialsError();
        }

        //Objeto con información que queremos almacenar en el token
        const tokenInfo = {
            id: user.id,
        };

        //creamos el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        // Logeamos el usuario.
        await selectUserByEmailModel(email, password);

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;

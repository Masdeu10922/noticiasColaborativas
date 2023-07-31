const bcrypt = require('bcrypt');
const { missingFields, invalidCredentialsError } = require('../../services/errorService');
const selectUserByEmailModel = require('..//..//models/users/selectUserByEmailModel');

const loginUser = async (req, res, next) =>{
    try {
        const{email,password} = req.body;
        if (!email || !password){
            missingFields();
        }

        const user = await selectUserByEmailModel(email, password);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            invalidCredentialsError();
        }

          // Logeamos el usuario.
          await selectUserByEmailModel (email, password);

          res.send({
              status: 'ok',
          });
      
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
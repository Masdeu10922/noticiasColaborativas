const editUserEmailController = require('../users/editUserEmailController');
const editUserBioController = require('./editUserBioController');
const editUserPassController = require('./editUserPassController');
const editUserPhotoController = require('./editUserPhotoController');
const getOwnUserController = require('./getOwnUserController');
const getUserProfileController = require('./getUserProfileController');
const loginUserController = require('./loginUserController');
const newUserController = require('./newUserController');

module.exports = {
    newUserController,
    loginUserController,
    getUserProfileController,
    getOwnUserController,
    editUserPhotoController,
    editUserPassController,
    editUserEmailController,
    editUserBioController,
};

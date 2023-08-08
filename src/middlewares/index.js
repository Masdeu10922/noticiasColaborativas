const authUser = require('./authUser');
const authUserOptional = require('./authUserOptional');
const canEdit = require('./canEdit');
const newsExists = require('./newsExists');
const userExists = require('./userExists');

module.exports = {
    authUser,
    userExists,
    newsExists,
    canEdit,
    authUserOptional,
};

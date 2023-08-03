const authUser = require('./authUser');
const canEdit = require('./canEdit');
const newsExists = require('./newsExists');
const userExists = require('./userExists');

module.exports = {
    authUser,
    userExists,
    newsExists,
    canEdit,
};

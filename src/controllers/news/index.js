const addNewsPhotoController = require('./addNewsPhotoController');
const deleteNewsController = require('./deleteNewsController');
const getNewsController = require('./getNewsController');
const listNewsController = require('./listNewsController');
const modifyNewsController = require('./modifyNewsController');
const newNewsController = require('./newNewsController');
const voteNewsController = require('./voteNewsController');

module.exports = {
    newNewsController,
    addNewsPhotoController,
    deleteNewsController,
    voteNewsController,
    listNewsController,
    modifyNewsController,
    getNewsController,
};

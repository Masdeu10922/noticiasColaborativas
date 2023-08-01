const selectUserByIdModel = require('../../models/users/selectUserByIdModel ');

const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await selectUserByIdModel(userId);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUserProfile;

const { User } = require('../../db.js');

const getUser = async (req, res) => {
    try {
        const users = await User.findAll({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getUser;
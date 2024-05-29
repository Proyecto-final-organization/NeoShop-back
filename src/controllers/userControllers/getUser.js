const { User } = require('../../db.js');

const getUser = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = getUser;
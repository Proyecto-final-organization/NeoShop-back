const { User } = require('../../db.js');

const getUserById = async (idUser) => {
    const user = await User.findByPk(idUser);
    return user;
};

module.exports = getUserById;
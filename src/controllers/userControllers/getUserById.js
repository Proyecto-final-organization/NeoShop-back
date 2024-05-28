const { User } = require('../../db.js');

const getUserById = async (req,res) => {
    const {idUser} = req.params;
    try {
        const user = await User.findByPk(idUser);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = getUserById;
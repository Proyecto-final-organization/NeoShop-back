const { User } = require('../../db.js');

const postUser = async (req, res) => {
    let {name, lastname, password, city, state, postalCode, email} = req.body;
    if (!name || !lastname || !password || !city || !state || !postalCode || !email) return res.status(400).json({error: "Faltan datos"});
    try {
        const [user, created] = await User.findOrCreate({
            where: {email},
            defaults: {name, lastname, password, city, state, postalCode}
        });
        if (created) return res.status(200).json(user);
        else return res.status(400).json({error: "El email ya está asociado a una cuenta"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = postUser;
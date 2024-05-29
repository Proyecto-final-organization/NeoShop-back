const { User } = require('../../db.js');
const bcryptjs = require("bcryptjs");

const postUser = async (data) => {
    let {name, lastname, password, city, state, postalCode, email} = data;
    if (!name || !lastname || !password || !city || !state || !postalCode || !email) return Error("Incomplete data");
    const hashPassword = await bcryptjs.hash(password, 10);
    
    const [user, created] = await User.findOrCreate({
        where: {email},
        defaults: {name, lastname, password: hashPassword, city, state, postalCode}
    });
    if (created) return user;
    else return Error("The email is already associated with an account");
}
module.exports = postUser;
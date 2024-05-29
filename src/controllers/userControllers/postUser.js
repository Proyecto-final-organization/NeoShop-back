const { user } = require('../../db.js');
const bcryptjs = require("bcryptjs");

const postUser = async (data) => {
    let {name, lastname, password, city, state, postalCode, email, nro_document} = data;
    if (!name || !lastname || !password || !city || !state || !postalCode || !email) throw Error("Incomplete data");
    const hashPassword = await bcryptjs.hash(password, 10);

    //const nro_document = 1234;
    
    const [newUser, created] = await user.findOrCreate({
        where: {email},
        defaults: {name, lastname, password: hashPassword, city, state, postalCode, nro_document}
    });
    
    if (created) return newUser;
    else throw Error("The email is already associated with an account");
}
module.exports = postUser;
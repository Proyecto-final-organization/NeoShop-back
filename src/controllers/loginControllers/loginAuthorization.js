const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { user } = require("../../db.js");
dotenv.config();

const authorization = async (token) => {
    try {
        const auth = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const theUser = await user.findByPk(auth.user);
        return theUser;
    } catch (error) {
        console.log(error);
        throw new Error(error.name);
    }
};

module.exports = authorization;
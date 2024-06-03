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
        if (error instanceof jsonwebtoken.TokenExpiredError) {
            throw new Error("Token has expired");
        } else if (error instanceof jsonwebtoken.JsonWebTokenError) {
            throw new Error("Invalid token");
        } else {
            throw new Error("Token verification error");
        }
    }
};

module.exports = authorization;
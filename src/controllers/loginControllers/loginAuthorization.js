const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorization = async (token) => {
    try {
        const auth = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return auth;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = authorization;
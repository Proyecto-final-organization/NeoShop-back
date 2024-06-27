const { user } = require("../../db");
const jwt = require("jsonwebtoken");
const transporter = require("../../helpers/nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const forgotPassword = async (email) => {
    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) {
        throw new Error("User not found");
    };

    const resetToken = jwt.sign(
        { id_user: foundUser.id_user },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    try {
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `
            <h1>Password Reset</h1>
            <p>You requested a password reset</p>
            <p>Click this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        const response = await transporter.sendMail({
        to: email,
        subject: "Password Reset Request",
        html: message
        });
        
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = forgotPassword;